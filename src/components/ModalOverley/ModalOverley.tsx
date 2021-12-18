import React from 'react'
import ReactDOM from 'react-dom';
import styles from './ModalOverley.module.css'

const modalRoot = document.getElementById('app')!;

export default class ModalOverley extends React.Component {
  render() {
    const { children } = this.props;
    // Возвращаем ReactDOM.createPortal,
    // который поместит дочерние элементы в modalRoot
    return ReactDOM.createPortal(
      <>
        <section className={styles.modal}>{children}</section>
      </>,
      modalRoot
    );
  }
}