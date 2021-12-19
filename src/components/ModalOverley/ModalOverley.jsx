import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import styles from './ModalOverley.module.css'

const modalRoot = document.getElementById('root');

export default class ModalOverley extends React.Component {
  render() {
    const { children, isModalVisible } = this.props;
    // Возвращаем ReactDOM.createPortal,
    // который поместит дочерние элементы в modalRoot
    return ReactDOM.createPortal(
      <>
        <section className={isModalVisible ? `${styles.modal} ${styles.modalActive}` : styles.modal }>{children}</section>
      </>,
      modalRoot
    );
  }
}

ModalOverley.propTypes = {
  isModalVisible: PropTypes.bool,
}