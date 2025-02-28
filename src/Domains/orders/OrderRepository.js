class OrderRepository {
  async addOrder(newOrder) {
    throw new Error("ORDER_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async getOrderById(id) {
    throw new Error("ORDER_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async getOrdersByUserId(userId) {
    throw new Error("ORDER_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async verifyOrderOwner(orderId, userId) {
    throw new Error("ORDER_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async updateOrderStatus(orderId, status) {
    throw new Error("ORDER_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }
}

module.exports = OrderRepository;
