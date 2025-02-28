/* istanbul ignore file */

const { createContainer } = require("instances-container");

// external agency
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");
const Jwt = require("@hapi/jwt");
const pool = require("./database/postgres/pool");

// service (repository, helper, manager, etc)
const PasswordHash = require("../Applications/security/PasswordHash");
const BcryptPasswordHash = require("./security/BcryptPasswordHash");
//authenticationRepository
const AuthenticationRepository = require("../Domains/authentications/AuthenticationRepository");
const AuthenticationRepositoryPostgres = require("./repository/AuthenticationRepositoryPostgres");
//userRepository
const UserRepository = require("../Domains/users/UserRepository");
const UserRepositoryPostgres = require("./repository/UserRepositoryPostgres");
//commentRepository
const CommentRepository = require("./repository/CommentRepositoryPostgres");
const CommentRepositoryPostgres = require("./repository/CommentRepositoryPostgres");
//threadRepository
const ThreadRepository = require("./repository/ThreadRespositoryPostgres");
const ThreadRepositoryPostgres = require("./repository/ThreadRespositoryPostgres");

// use case
const AuthenticationTokenManager = require("../Applications/security/AuthenticationTokenManager");
const JwtTokenManager = require("./security/JwtTokenManager");
const RefreshAuthenticationUseCase = require("../Applications/use_case/Auth_UseCase/RefreshAuthenticationUseCase");
//userUseCase
const AddUserUseCase = require("../Applications/use_case/UserUseCase/AddUserUseCase");
const LoginUserUseCase = require("../Applications/use_case/UserUseCase/LoginUserUseCase");
const LogoutUserUseCase = require("../Applications/use_case/UserUseCase/LogoutUserUseCase");
//threadUseCase
const AddThreadUseCase = require("../Applications/use_case/ThreadUseCase/AddThreadUseCase");
const GetDetailThreadByIdUseCase = require("../Applications/use_case/ThreadUseCase/GetDetailThreadByIdUseCase");

//commentUseCase
const AddCommentUseCase = require("../Applications/use_case/CommentUseCase/AddCommentUseCase");
const DeleteCommentUseCase = require("../Applications/use_case/CommentUseCase/DeleteCommentUseCase");
const ProductRepository = require("../Domains/products/ProductRepository");
const ProductRepositoryPostgres = require("./repository/ProductRepositoryPostgres");
const OrderRepository = require("../Domains/orders/OrderRepository");
const OrderRepositoryPostgres = require("./repository/OrderRepositoryPostgres");
const PaymentRepository = require("../Domains/payments/PaymentRepository");
const PaymentRepositoryPostgres = require("./repository/PaymentRepositoryPostgres");
const PaypalService = require("./payment/PaypalService");
const AddProductUseCase = require("../Applications/use_case/ProductUseCase/AddProductUseCase");
const GetProductDetailUseCase = require("../Applications/use_case/ProductUseCase/GetProductDetailUseCase");
const DeleteProductUseCase = require("../Applications/use_case/ProductUseCase/DeleteProductUseCase");
const CreateOrderUseCase = require("../Applications/use_case/OrderUseCase/CreateOrderUseCase");
const GetOrderDetailUseCase = require("../Applications/use_case/OrderUseCase/GetOrderDetailUseCase");
const CreatePaypalPaymentUseCase = require("../Applications/use_case/PaymentUseCase/CreatePaypalPaymentUseCase");
const ProcessPaypalWebhookUseCase = require("../Applications/use_case/PaymentUseCase/ProcessPaypalWebhookUseCase");

// creating container
const container = createContainer();

// registering services and repository
container.register([
  //userRepository
  {
    key: UserRepository.name,
    Class: UserRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  //authenticationRepository
  {
    key: AuthenticationRepository.name,
    Class: AuthenticationRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  //passwordHash
  {
    key: PasswordHash.name,
    Class: BcryptPasswordHash,
    parameter: {
      dependencies: [
        {
          concrete: bcrypt,
        },
      ],
    },
  },
  //authenticationTokenManager
  {
    key: AuthenticationTokenManager.name,
    Class: JwtTokenManager,
    parameter: {
      dependencies: [
        {
          concrete: Jwt.token,
        },
      ],
    },
  },
  //threadRepository
  {
    key: ThreadRepository.name,
    Class: ThreadRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  //commentRepository
  {
    key: CommentRepository.name,
    Class: CommentRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
]);

// registering use cases
container.register([
  //addUserUseCase
  {
    key: AddUserUseCase.name,
    Class: AddUserUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "userRepository",
          internal: UserRepository.name,
        },
        {
          name: "passwordHash",
          internal: PasswordHash.name,
        },
      ],
    },
  },
  //loginUserUseCase
  {
    key: LoginUserUseCase.name,
    Class: LoginUserUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "userRepository",
          internal: UserRepository.name,
        },
        {
          name: "authenticationRepository",
          internal: AuthenticationRepository.name,
        },
        {
          name: "authenticationTokenManager",
          internal: AuthenticationTokenManager.name,
        },
        {
          name: "passwordHash",
          internal: PasswordHash.name,
        },
      ],
    },
  },
  //logoutUserUseCase
  {
    key: LogoutUserUseCase.name,
    Class: LogoutUserUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "authenticationRepository",
          internal: AuthenticationRepository.name,
        },
      ],
    },
  },
  //refreshAuthenticationUseCase
  {
    key: RefreshAuthenticationUseCase.name,
    Class: RefreshAuthenticationUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "authenticationRepository",
          internal: AuthenticationRepository.name,
        },
        {
          name: "authenticationTokenManager",
          internal: AuthenticationTokenManager.name,
        },
      ],
    },
  },
  //addThreadUseCase
  {
    key: AddThreadUseCase.name,
    Class: AddThreadUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "threadRepository",
          internal: ThreadRepository.name,
        },
      ],
    },
  },
  //getThreadUseCase
  {
    key: GetDetailThreadByIdUseCase.name,
    Class: GetDetailThreadByIdUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "threadRepository",
          internal: ThreadRepository.name,
        },
        {
          name: "commentRepository",
          internal: CommentRepository.name,
        },
      ],
    },
  },
  //addCommentUseCase
  {
    key: AddCommentUseCase.name,
    Class: AddCommentUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "commentRepository",
          internal: CommentRepository.name,
        },
        {
          name: "threadRepository",
          internal: ThreadRepository.name,
        },
      ],
    },
  },
  //deleteCommentUseCase
  {
    key: DeleteCommentUseCase.name,
    Class: DeleteCommentUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "commentRepository",
          internal: CommentRepository.name,
        },
      ],
    },
  },
]);

// Register new repositories for products, orders, and payments
container.register([
  {
    key: ProductRepository.name,
    Class: ProductRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  {
    key: OrderRepository.name,
    Class: OrderRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  {
    key: PaymentRepository.name,
    Class: PaymentRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  {
    key: PaypalService.name,
    Class: PaypalService,
    parameter: {
      dependencies: [],
    },
  },
]);

// Register new use cases for products, orders, and payments
container.register([
  {
    key: AddProductUseCase.name,
    Class: AddProductUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "productRepository",
          internal: ProductRepository.name,
        },
      ],
    },
  },
  {
    key: GetProductDetailUseCase.name,
    Class: GetProductDetailUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "productRepository",
          internal: ProductRepository.name,
        },
        {
          name: "userRepository",
          internal: UserRepository.name,
        },
      ],
    },
  },
  {
    key: DeleteProductUseCase.name,
    Class: DeleteProductUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "productRepository",
          internal: ProductRepository.name,
        },
      ],
    },
  },
  {
    key: CreateOrderUseCase.name,
    Class: CreateOrderUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "orderRepository",
          internal: OrderRepository.name,
        },
        {
          name: "productRepository",
          internal: ProductRepository.name,
        },
        {
          name: "paymentRepository",
          internal: PaymentRepository.name,
        },
      ],
    },
  },
  {
    key: GetOrderDetailUseCase.name,
    Class: GetOrderDetailUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "orderRepository",
          internal: OrderRepository.name,
        },
        {
          name: "productRepository",
          internal: ProductRepository.name,
        },
        {
          name: "paymentRepository",
          internal: PaymentRepository.name,
        },
      ],
    },
  },
  {
    key: CreatePaypalPaymentUseCase.name,
    Class: CreatePaypalPaymentUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "orderRepository",
          internal: OrderRepository.name,
        },
        {
          name: "paymentRepository",
          internal: PaymentRepository.name,
        },
        {
          name: "paypalService",
          internal: PaypalService.name,
        },
      ],
    },
  },
  {
    key: ProcessPaypalWebhookUseCase.name,
    Class: ProcessPaypalWebhookUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "orderRepository",
          internal: OrderRepository.name,
        },
        {
          name: "paymentRepository",
          internal: PaymentRepository.name,
        },
        {
          name: "paypalService",
          internal: PaypalService.name,
        },
      ],
    },
  },
]);

module.exports = container;
