import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Box, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { selectCartItems, selectTokenMidtrans, selectUser } from '@containers/App/selectors';
import { useEffect, useState } from 'react';
import { deleteCourseFromCart, getCartItems, getTokenMidtrans } from '@containers/App/actions';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.scss';
import defaultCover from '../../static/images/default-cover-course.png';

const CLIENT_KEY = process.env.REACT_APP_CLIENT_KEY || 'SB-Mid-client-31o5hooOLggseysN';

const formatCurrencyWithoutPrefix = (amount) => {
  const formatted = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0, // Adjust if you want to control decimal places
  }).format(amount);
  return formatted.replace('Rp', '').trim();
};
const Cart = ({ user, cartItems, tokenMidtrans }) => {
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log(cartItems);
    dispatch(getCartItems(user.id));
    console.log(cartItems, 'cartItems');
  }, [dispatch, user.id]);
  useEffect(() => {
    const snapSrcUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';
    const myMidtransClientKey = `${CLIENT_KEY}`;
    const script = document.createElement('script');
    script.src = snapSrcUrl;
    script.setAttribute('data-client-key', myMidtransClientKey);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleDelete = (cartId, courseId) => {
    // console.log('delete', cartId, courseId);
    dispatch(deleteCourseFromCart(cartId, courseId));
    navigate('/cart');
  };

  const handleCheckout = (cartId, price) => {
    // console.log(cartId, price);
    if (!tokenMidtrans) {
      dispatch(getTokenMidtrans({ cartId, price }));
    }
    console.log(tokenMidtrans, 'snapToken');
    window.snap.pay(tokenMidtrans, {
      onSuccess: () => {
        console.log('success');
      },
      onPending: (result) => {
        console.log('pending transaction', result);
      },
      onError: (result) => {
        console.log('error transaction', result);
      },
      onClose: () => {
        console.log('customer close the popup window without the finishing the payment');
      },
    });
  };
  return (
    <div className={styles.container}>
      <h2>Cart</h2>
      <div className={styles.feature}>
        <div className={styles.listItemContainer}>
          <div className={styles.listItem}>
            <h5>{cartItems.count} courses in cart</h5>

            {cartItems.list?.data.length > 0 ? (
              cartItems.list.data.map((item, index) => (
                <div className={styles.item} key={index}>
                  <img src={defaultCover} alt="" width="180px" />
                  <div className={styles.description}>
                    <h3>{item.name}</h3>
                    <p>Oleh {item.instructor_name}</p>
                    <IconButton
                      aria-label="delete"
                      size="small"
                      color="error"
                      onClick={() => handleDelete(item.cart_id, item.course_id)}
                    >
                      <DeleteIcon size="small" />
                    </IconButton>
                  </div>
                  <div className={styles.price}>
                    <p>Rp. {formatCurrencyWithoutPrefix(item.price)}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>Cart is empty</p>
            )}
            {/* <div className={styles.item}>
              <img src={defaultCover} alt="" width="180px" />
              <div className={styles.description}>
                <h3>Judul Course</h3>
                <p>Oleh </p>
              </div>
              <div className={styles.price}>
                <p>Rp. 100.000</p>
              </div>
            </div> */}
          </div>
        </div>
        <div className={styles.checkout}>
          <span>Total</span>
          <h3>Rp. {formatCurrencyWithoutPrefix(cartItems.totalPrice)}</h3>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleCheckout(cartItems.list.data[0].cart_id, cartItems.totalPrice)}
          >
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

Cart.propTypes = {
  user: PropTypes.object,
  cartItems: PropTypes.object,
  tokenMidtrans: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  user: selectUser,
  cartItems: selectCartItems,
  tokenMidtrans: selectTokenMidtrans,
});

export default connect(mapStateToProps)(Cart);
