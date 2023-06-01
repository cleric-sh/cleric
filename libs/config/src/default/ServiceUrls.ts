import {AwsSecretKey} from '../configuration/decorators/AwsSecretKey';
import {Use} from '../configuration/decorators/Use';

/**
 * Configuration object for service discovery.
 *
 * Values in ServiceUrls are loaded directly from ServicesSecret in AWS Secret Manager,
 * but can be overridden by sources in parent classes with a higher precedence.
 */
@Use('ServicesSecret')
export class ServiceUrls {
  @AwsSecretKey('tibber_app_gateway') appGateway = '';
  @AwsSecretKey('tibber_pyanalytics') analytics = '';
  @AwsSecretKey('tibber_bankid') bankId = '';
  @AwsSecretKey('tibber_cersei') cersei = '';
  @AwsSecretKey('tibber_customer') customer = '';
  @AwsSecretKey('tibber_pydemandresponse') demandResponse = '';
  @AwsSecretKey('tibber_easee') easee = '';
  @AwsSecretKey('tibber_edi_server_de') ediDe = '';
  @AwsSecretKey('tibber_edi_server_no') ediNo = '';
  @AwsSecretKey('tibber_edi_server') edi = '';
  @AwsSecretKey('tibber_elhub') elhub = '';
  @AwsSecretKey('tibber_email') email = '';
  @AwsSecretKey('tibber_energy_market') energyMarket = '';
  @AwsSecretKey('tibber_home_control') homeControl = '';
  @AwsSecretKey('tibber_invite') invite = '';
  @AwsSecretKey('tibber_iot') iot = '';
  @AwsSecretKey('tibber_pyml') ml = '';
  @AwsSecretKey('tibber_netarea') netArea = '';
  @AwsSecretKey('tibber_notifications') notification = '';
  @AwsSecretKey('tibber_onboarding') onboarding = '';
  @AwsSecretKey('tibber_payment') payment = '';
  @AwsSecretKey('tibber_payment_signup') paymentSignup = '';
  @AwsSecretKey('tibber_push_notifications') pushNotification = '';
  @AwsSecretKey('tibber_sms') sms = '';
  @AwsSecretKey('tibber_woocommerce_de') storeDe = '';
  @AwsSecretKey('tibber_woocommerce_no') storeNo = '';
  @AwsSecretKey('tibber_woocommerce_se') storeSe = '';
  @AwsSecretKey('tibber_subscription') subscription = '';
  @AwsSecretKey('tibber_telemetry') telemetry = '';
  @AwsSecretKey('tibber_timeseries') timeSeries = '';
  @AwsSecretKey('tibber_trading') trading = '';
  @AwsSecretKey('tibber_wallet') wallet = '';
}
