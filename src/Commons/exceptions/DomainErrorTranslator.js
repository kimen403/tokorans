const InvariantError = require("./InvariantError");

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator._directories[error.message] || error;
  },
};

DomainErrorTranslator._directories = {
  "NEW_PAYMENT.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat pembayaran baru karena properti yang dibutuhkan tidak ada"
  ),
  "NEW_PAYMENT.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat pembayaran baru karena tipe data tidak sesuai"
  ),
  "NEW_PAYMENT.PAYMENT_METHOD_NOT_SUPPORTED": new InvariantError(
    "metode pembayaran tidak didukung"
  ),
  "NEW_PAYMENT.AMOUNT_MUST_BE_POSITIVE": new InvariantError(
    "jumlah pembayaran harus lebih dari 0"
  ),
  "ADDED_PAYMENT.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "pembayaran tidak memenuhi properti yang dibutuhkan"
  ),
  "ADDED_PAYMENT.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "pembayaran tidak memenuhi spesifikasi tipe data"
  ),
  "ADDED_PAYMENT.PAYMENT_METHOD_NOT_SUPPORTED": new InvariantError(
    "metode pembayaran tidak didukung"
  ),
  "ADDED_PAYMENT.STATUS_NOT_VALID": new InvariantError(
    "status pembayaran tidak valid"
  ),
  "ADDED_PAYMENT.PAYPAL_TRANSACTION_ID_NOT_MEET_DATA_TYPE_SPECIFICATION":
    new InvariantError("tipe data paypal transaction id tidak sesuai"),
  "DETAIL_PAYMENT.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat mengambil detail pembayaran karena properti yang dibutuhkan tidak ada"
  ),
  "DETAIL_PAYMENT.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat mengambil detail pembayaran karena tipe data tidak sesuai"
  ),
  "DETAIL_PAYMENT.PAYMENT_METHOD_NOT_SUPPORTED": new InvariantError(
    "metode pembayaran tidak didukung"
  ),
  "DETAIL_PAYMENT.STATUS_NOT_VALID": new InvariantError(
    "status pembayaran tidak valid"
  ),
  "DETAIL_PAYMENT.PAYPAL_TRANSACTION_ID_NOT_MEET_DATA_TYPE_SPECIFICATION":
    new InvariantError("tipe data paypal transaction id tidak sesuai"),
  "DETAIL_PAYMENT.ORDER_NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "order dalam pembayaran tidak memiliki properti yang dibutuhkan"
  ),
  "DETAIL_PAYMENT.ORDER_NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tipe data order dalam pembayaran tidak sesuai"
  ),
  "NEW_ORDER.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat order baru karena properti yang dibutuhkan tidak ada"
  ),
  "NEW_ORDER.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat order baru karena tipe data tidak sesuai"
  ),
  "NEW_ORDER.QUANTITY_MUST_BE_POSITIVE": new InvariantError(
    "tidak dapat membuat order baru karena kuantitas harus lebih dari 0"
  ),
  "NEW_ORDER.TOTAL_AMOUNT_MUST_BE_POSITIVE": new InvariantError(
    "tidak dapat membuat order baru karena total amount harus lebih dari 0"
  ),
  "ADDED_ORDER.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "order tidak memenuhi properti yang dibutuhkan"
  ),
  "ADDED_ORDER.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "order tidak memenuhi spesifikasi tipe data"
  ),
  "ADDED_ORDER.STATUS_NOT_VALID": new InvariantError(
    "status order tidak valid"
  ),
  "DETAIL_ORDER.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat mengambil detail order karena properti yang dibutuhkan tidak ada"
  ),
  "DETAIL_ORDER.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat mengambil detail order karena tipe data tidak sesuai"
  ),
  "DETAIL_ORDER.STATUS_NOT_VALID": new InvariantError(
    "status order tidak valid"
  ),
  "DETAIL_ORDER.PAYMENT_NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tipe data payment tidak sesuai"
  ),
  "DETAIL_ORDER.PRODUCT_NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "produk dalam order tidak memiliki properti yang dibutuhkan"
  ),
  "DETAIL_ORDER.PRODUCT_NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tipe data produk dalam order tidak sesuai"
  ),
  "NEW_PRODUCT.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat produk baru karena properti yang dibutuhkan tidak ada"
  ),
  "NEW_PRODUCT.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat produk baru karena tipe data tidak sesuai"
  ),
  "NEW_PRODUCT.PRICE_MUST_BE_POSITIVE": new InvariantError(
    "tidak dapat membuat produk baru karena harga harus lebih dari 0"
  ),
  "ADDED_PRODUCT.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "produk tidak memenuhi properti yang dibutuhkan"
  ),
  "ADDED_PRODUCT.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "produk tidak memenuhi spesifikasi tipe data"
  ),
  "DETAIL_PRODUCT.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat mengambil detail produk karena properti yang dibutuhkan tidak ada"
  ),
  "DETAIL_PRODUCT.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat mengambil detail produk karena tipe data tidak sesuai"
  ),
  "DETAIL_PRODUCT.OWNER_NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat mengambil detail produk karena tipe data owner tidak sesuai"
  ),
  "NEW_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat comment baru karena properti yang dibutuhkan tidak ada"
  ),
  "NEW_COMMENT.NOT_MEET_DATA_SPESIFICATION": new InvariantError(
    "tidak dapat membuat comment baru karena tipe data tidak sesuai"
  ),
  "DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat thread baru karena properti yang dibutuhkan tidak ada"
  ),
  "DETAIL_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat thread baru karena Type Data tidak sesuai Silahkan cek kembali"
  ),
  "REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada"
  ),
  "REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat user baru karena tipe data tidak sesuai"
  ),
  "REGISTER_USER.USERNAME_LIMIT_CHAR": new InvariantError(
    "tidak dapat membuat user baru karena karakter username melebihi batas limit"
  ),
  "REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER": new InvariantError(
    "tidak dapat membuat user baru karena username mengandung karakter terlarang"
  ),
  "USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "harus mengirimkan username dan password"
  ),
  "USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "username dan password harus string"
  ),
  "REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN":
    new InvariantError("harus mengirimkan token refresh"),

  "REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION":
    new InvariantError("refresh token harus string"),

  "DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN":
    new InvariantError("harus mengirimkan token refresh"),

  "DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION":
    new InvariantError("refresh token harus string"),

  "NEW_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat thread baru karena Type Data tidak sesuai Silahkan cek kembali"
  ),
  "NEW_THREAD.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat thread baru karena property tidak lengkap Silahkan cek kembali"
  ),
};

module.exports = DomainErrorTranslator;
