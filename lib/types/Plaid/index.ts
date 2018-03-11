// tslint:disable-next-line:no-namespace
declare namespace Plaid {
  type Products = 'auth' | 'balance' | 'identity' | 'income' | 'transactions'

  // === === PLAID ITEM === === \\
  interface Item {
    available_products: ReadonlyArray<Products>
    billed_products: ReadonlyArray<Products>
    error: Error | null
    institution_id: string
    item_id: string
    webhook: string
  }

  interface GetItemRequestParams {
    client_id: string
    secret: string
    access_token: string
  }

  interface GetItemResponseBody {
    item: Item
    request_id: string
  }

  // === === PLAID ACCOUNT === === \\

  interface Account {
    account_id: string
    balances: AccountBalances
    mask: string | null
    name: string | null
    official_name: string | null
    type: AccountType | null
    subtype: AccountSubtype | null
  }

  interface GetAccountResponseBody {
    accounts: ReadonlyArray<Account>
    item: Item
    request_id: string
  }

  interface AccountBalances {
    available: number | null
    current: number | null
    limit: number | null
  }

  type AccountType =
    | 'brokerage'
    | 'credit'
    | 'depository'
    | 'loan'
    | 'mortgage'
    | 'other'

  // TODO: map subtypes to account types from plaid docs
  // probably need to do this using complex sub-interfaces and intersect them
  // not worth it yet
  type AccountSubtype =
    | 'brokerage'
    | '401k'
    | 'brokerage'
    | 'ira'
    | 'retirement'
    | 'roth'
    | 'ugma'
    | 'credit'
    | 'credit card'
    | 'paypal'
    | 'line of credit'
    | 'rewards'
    | 'depository	checking'
    | 'savings'
    | 'money market'
    | 'paypal'
    | 'prepaid'
    | 'loan	auto'
    | 'commercial'
    | 'construction'
    | 'consumer'
    | 'home'
    | 'home equity'
    | 'loan'
    | 'mortgage'
    | 'overdraft'
    | 'line of credit'
    | 'student'
    | 'home'
    | '403B'
    | 'cash management'
    | 'cd'
    | 'hsa'
    | 'keogh'
    | 'money market'
    | 'mutual fund'
    | 'prepaid'
    | 'recurring'
    | 'rewards'
    | 'safe deposit'
    | 'sarsep'
    | 'other'

  // === === PLAID TRANSACTION === === \\

  interface Transaction {
    transaction_id: string
    account_id: string
    amount: number
    category: ReadonlyArray<string>
    category_id: string
    date: string
    location: Location
    name: string
    payment_meta: object
    pending: boolean
    pending_transaction_id: string | null
    account_owner: string | null
    transaction_type: TransactionType
  }

  type TransactionType = 'place' | 'digital' | 'special' | 'unresolved'

  interface GetTransactionsRequestParams {
    client_id: string
    secret: string
    access_token: string
    start_date: string
    end_date: string
    options?: {
      count: number
      offset: number
    }
  }

  interface GetTransactionsResponseBody {
    accounts: ReadonlyArray<Account>
    transactions: ReadonlyArray<Transaction>
    item: Item
    total_transactions: number
    request_id: string
  }

  // === === PLAID WEBHOOK === === \\
  interface BaseWebhook {
    webhook_type: 'ITEM' | 'TRANSACTIONS'
    webhook_code: string
    item_id: string
    error: object | null
  }

  interface InitialTransactionWebhook extends BaseWebhook {
    webhook_type: 'TRANSACTIONS'
    webhook_code: 'INITIAL_UPDATE'
    error: null
    new_transactions: number
  }

  interface HistoricalTransactionWebhook extends BaseWebhook {
    webhook_type: 'TRANSACTIONS'
    webhook_code: 'HISTORICAL_UPDATE'
    error: null
    new_transactions: number
  }

  interface DefaultTransactionWebhook extends BaseWebhook {
    webhook_type: 'TRANSACTIONS'
    webhook_code: 'DEFAULT_UPDATE'
    error: null
    new_transactions: number
  }

  interface RemovedTransactionWebhook extends BaseWebhook {
    webhook_type: 'TRANSACTIONS'
    webhook_code: 'TRANSACTIONS_REMOVED'
    error: null
    removed_transactions: ReadonlyArray<string>
  }

  type TransactionWebhook =
    | InitialTransactionWebhook
    | HistoricalTransactionWebhook
    | DefaultTransactionWebhook
    | RemovedTransactionWebhook

  interface ItemWebhookUpdateWebhook extends BaseWebhook {
    webhook_type: 'ITEM'
    webhook_code: 'WEBHOOK_UPDATE_ACKNOWLEDGED'
    new_webhook: string
  }

  interface ItemErrorWebhook extends BaseWebhook {
    webhook_type: 'ITEM'
    webhook_code: 'ERROR'
    error: {
      display_message: string
      error_code: string
      error_message: string
      error_type: string
      status: number
    }
  }

  type ItemWebhook = ItemWebhookUpdateWebhook | ItemErrorWebhook

  type Webhook = TransactionWebhook | ItemWebhook

  // === === PLAID MISC === === \\

  interface Location {
    address: string | null
    city: string | null
    state: string | null
    zip: string | null
    lat: number | null
    lon: number | null
  }

  interface Category {
    group: 'string'
    hierarchy: ReadonlyArray<string>
    category_id: 'string'
  }

  type ErrorType =
    | 'INVALID_REQUEST'
    | 'INVALID_INPUT'
    | 'RATE_LIMIT_EXCEEDED'
    | 'API_ERROR'
    | 'ITEM_ERROR'

  interface Error {
    error_type: ErrorType
    http_code: number
    error_code: string
    error_message: string
    display_message: string | null
    request_id: string
  }
}
