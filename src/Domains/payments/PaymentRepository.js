class PaymentRepository {
  async addPayment(newPayment) {
    throw new Error("PAYMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async getPaymentByOrderId(orderId) {
    throw new Error("PAYMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async updatePaymentStatus(orderId, status, paypalTransactionId = null) {
    throw new Error("PAYMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async verifyPaymentOwner(paymentId, userId) {
    throw new Error("PAYMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async getPaymentsByUserId(userId) {
    throw new Error("PAYMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }
}

module.exports = PaymentRepository;
