import { Fragment } from 'react/jsx-runtime';
import { useEffect, useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import { Card, CheckoutMode, Country, Subscription } from '../../types/billing';
import { ApiFieldError } from '../../utils/api/types';
import { deleteApi, getApi, postApi, putApi } from '../../utils/api/api';
import { toast } from 'react-toastify';
import { useUnsavedChanges } from '../../contexts/UnsavedChangesContext';
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { Permissions, RbacPermissions } from '../../types/common';
import { Modal, ModalFooter, ModalBody, ModalHeader } from 'reactstrap';
import { ChevronDownIcon, Loader } from 'lucide-react';
import { UIField } from '../../components/UIField';
import { Dropdown } from '../../components/DropDown';
import './styles.css';
import { Settings } from '../../components/Settings';
import SettingsHeader from '../../components/SettingsHeader';
import Button from '../../components/Button';
import SettingsContainer from '../../components/SettingsContainer';
import SectionHeader from '../../components/SectionHeader';
import { clearQueryString } from '../../utils/uri';

export default function BillingPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    cards,
    invoices,
    subscriptions,
    user,
    getSubscriptions,
    handleGetCard,
    handleInvoiceHistory,
  } = useUser();
  const { setHasUnsavedChanges } = useUnsavedChanges();

  const [add_card, setAddCard] = useState<boolean>(false);
  const [deleting_card, setDeletingCard] = useState<boolean>(false);
  const [cancelling_subscription, setCancellingSubscription] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [delete_card_id, setDeleteCardId] = useState<number>(0);
  const [api_field_errors, setApiFieldErrors] = useState<ApiFieldError[]>([]);
  const [cancel_subs_id, setCancelSubsId] = useState<number>(0);
  const [disabled_button, setDisabledButton] = useState<boolean>(false);

  // Add card
  const [cardholder, setCardholder] = useState('');
  const [card_no, setCardNo] = useState<string>('');
  const [card_no_error, setCardNoError] = useState<string>('');
  const [countries, setCountries] = useState<Country[]>([]);
  const [country_selected, setCountrySelected] = useState<Country>();
  const [cvv_cvc, setCvvCvc] = useState<string>('');
  const [cvv_cvc_error, setCvvCvcError] = useState<string>('');
  const [expiration, setExpiration] = useState('');
  const [validation_error, setValidationError] = useState('');

  const [hasShownCancelToast, setHasShownCancelToast] = useState(false);

  useEffect(() => {
    if (location.search) {
      const params = queryString.parse(location.search);
      if (params['session_id'] && params['session_id'].length > 0) {
        postApi({
          url: 'billing/create-subscription',
          payload: {
            session_id: params['session_id'].toString(),
          },
        }).then((res) => {
          if (res.results.data) {
            getSubscriptions();
          }
        });
      }

      clearQueryString();
    } else {
      getSubscriptions();
    }
    handleGetCard();
    handleInvoiceHistory();
    listCountries();
    setHasUnsavedChanges(false);
  }, []);

  useEffect(() => {
    checkDisabledButton();
    setHasUnsavedChanges(
      expiration.length > 0 ||
        card_no.length > 0 ||
        cvv_cvc.length > 0 ||
        cardholder.length > 0 ||
        country_selected !== undefined
    );
  }, [
    loading,
    card_no,
    expiration,
    cvv_cvc,
    cardholder,
    api_field_errors,
    validation_error,
    country_selected,
  ]);

  useEffect(() => {
    if (
      !hasShownCancelToast &&
      subscriptions.some((subscription) => subscription.cancel_at_period_end)
    ) {
      toast(
        'Your plan will be cancelled at the end of the current billing cycle.',
        {
          position: 'bottom-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          className: 'custom-theme',
          bodyClassName: 'p-2',
          pauseOnFocusLoss: false,
        }
      );
      setHasShownCancelToast(true);
    }
  }, [subscriptions, hasShownCancelToast]);

  const checkDisabledButton = () => {
    setDisabledButton(
      loading ||
        card_no.length === 0 ||
        !expiration ||
        expiration?.length === 0 ||
        !cvv_cvc ||
        cvv_cvc.length === 0 ||
        cardholder.length === 0 ||
        api_field_errors.length > 0 ||
        validation_error.length > 0 ||
        !country_selected
    );
  };

  const listCountries = () => {
    getApi<Country[]>({
      url: 'billing/countries',
    }).then((res) => {
      if (res.results.data) {
        setCountries(res.results.data);
      }
    });
  };

  const billingCycleStyle = (subscription: Subscription) => {
    let className = '';

    const currentDate = moment();
    const date2 = moment(subscription.current_period_end);
    const remainingDays = date2.diff(currentDate, 'days');

    if (
      remainingDays <= 7 &&
      ((remainingDays >= 0 && subscription.status !== 'canceled') ||
        (remainingDays > 0 && subscription.status === 'canceled'))
    ) {
      className = 'billing-cycle-red notif-end-date';
    } else {
      className = 'billing-cycle';
    }

    return className;
  };

  const getRemainingDays = (subscription: Subscription) => {
    const currentDate = moment();
    const date2 = moment(subscription?.current_period_end);
    const remainingDays = date2.diff(currentDate, 'days');
    if (remainingDays === 0 && subscription.status !== 'canceled') {
      return remainingDays + 1;
    }
    return remainingDays;
  };

  const cc_format = (value: string, mask?: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,19}/g);
    const match = (matches && matches[0]) || '';
    const parts: string[] = [];

    const len = match.length;
    for (let i = 0; i < len; i += 4) {
      let part = match.substring(i, i + 4);
      if (i + 4 < len && mask && mask.length > 0) {
        part = part.replace(/[0-9]/g, mask);
      }
      parts.push(part);
    }

    if (parts.length) {
      return parts.join('-');
    } else {
      return value;
    }
  };

  const handleCancelSubscription = () => {
    setLoading(true);
    putApi(`billing/cancel/${cancel_subs_id}`)
      .then((res) => {
        setLoading(false);
        if (res.results.error) {
          toast(res.results.error, {
            position: 'bottom-center',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
            className: 'custom-theme',
            bodyClassName: 'p-2',
            pauseOnFocusLoss: false,
          });
        }
        if (res.results.data) {
          setCancelSubsId(0);
          setCancellingSubscription(false);
          getSubscriptions();
        }
      })
      .catch(() => setLoading(false));
  };

  const clearCardFields = () => {
    setCardNo('');
    setExpiration('');
    setCvvCvc('');
    setCardholder('');
    setApiFieldErrors([]);
    setValidationError('');
    setCardNoError('');
    setCvvCvcError('');
    setCountrySelected(undefined);
    setHasUnsavedChanges(false);
  };

  // Add card
  const addCard = () => {
    setLoading(true);
    postApi({
      url: 'billing/card',
      payload: {
        number: card_no,
        expiration,
        cvv_cvc: cvv_cvc || '',
        cardholder_name: cardholder,
        country_code: country_selected?.code,
      },
    })
      .then((res) => {
        setLoading(false);
        if (res.results.errors) {
          setApiFieldErrors(res.results.errors);
        } else if (res.results.error) {
          toast(res.results.error, {
            position: 'bottom-center',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
            className: 'custom-theme',
            bodyClassName: 'p-2',
            pauseOnFocusLoss: false,
          });
        }
        if (res.results.data) {
          setAddCard(false);
          clearCardFields();
          handleGetCard();
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const deleteCard = () => {
    setLoading(true);
    deleteApi<Card>({ url: `billing/card/${delete_card_id}` })
      .then((res) => {
        setLoading(false);
        setDeletingCard(false);
        if (res.results.error) {
          toast(res.results.error, {
            position: 'bottom-center',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
            className: 'custom-theme',
            bodyClassName: 'p-2',
            pauseOnFocusLoss: false,
          });
        }
        if (res.results.data) {
          handleGetCard();
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const allowNumbersOnly = (e: any) => {
    const key_code = e.keyCode;
    const allowedKeys = [
      8, 9, 16, 17, 35, 36, 37, 38, 39, 40, 46, 48, 49, 50, 51, 52, 53, 54, 55,
      56, 57, 67, 86, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105,
    ];
    if (allowedKeys.indexOf(key_code) === -1) {
      e.preventDefault();
    }
  };

  const handleOnChangeExpiration = (e: any) => {
    setValidationError('');
    let val = e.target.value;
    if (val.length > 4 && !val.includes('/')) {
      val = expiration;
    }
    if (expiration.length <= val.length) {
      val = val
        .replace(
          /^([1-9]\/|[2-9])$/g,
          '0$1/' // 3 > 03/
        )
        .replace(
          /^(0[1-9]|1[0-2])$/g,
          '$1/' // 11 > 11/
        )
        .replace(
          /^([0-1])([3-9])$/g,
          '0$1/$2' // 13 > 01/3
        )
        .replace(
          /^(0?[1-9]|1[0-2])([0-9]{2})$/g,
          '$1/$2' // 141 > 01/41
        )
        .replace(
          /^([0]+)\/|[0]+$/g,
          '0' // 0/ > 0 and 00 > 0
        )
        .replace(
          /[^\d\\/]|^[\\/]*$/g,
          '' // To allow only digits and `/`
        )
        .replace(
          /\/\//g,
          '/' // Prevent entering more than 1 `/`
        );
      const [month, year] = val.split('/');
      if (month && year) {
        val = `${month.length < 2 ? `0${month}` : month}/${year}`;
      }
    }
    setExpiration(val);
  };

  const validateExpiration = () => {
    if (expiration.length > 3) {
      const today = new Date();
      const current_date = moment(
        new Date(
          today.getFullYear() +
            '-' +
            (today.getMonth() + 1) +
            '-' +
            new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
        )
      );
      const [month, year] = expiration.split('/');
      const expiration_date = moment(
        new Date(Number(`20${year}`), Number(month), 0)
      );
      if (current_date.isAfter(expiration_date)) {
        setValidationError('error.expiration.invalid');
      } else {
        setValidationError('');
      }
    }
  };

  return (
    <Fragment>
      {!user || user?.rbac_permissions.length === 0 ? (
        <div className="flex items-center justify-center mt-8">
          <Loader />
        </div>
      ) : (
        <>
          {user.rbac_permissions?.includes(
            RbacPermissions.MANAGE_BILLING_INVOICING_PAGE
          ) && (
            <Settings>
              <SettingsHeader
                title="Account Settings"
                secondaryButton={
                  <Button
                    onClick={() => navigate('/dashboard')}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                }
              />

              <SettingsContainer>
                <SectionHeader title="Billing and Invoicing" />

                <div className="credit-cards">
                  <h2 className="text-[16px] font-semibold text-gray-900">
                    Credit cards
                  </h2>
                  <table>
                    <thead>
                      <tr>
                        <th>Card details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cards.length === 0 && (
                        <tr>
                          <td>
                            <div className="card-detail">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-credit-card-2-back"
                                viewBox="0 0 16 16"
                              >
                                <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                                <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                              </svg>
                              <label className="no-card">
                                No credit card added
                              </label>
                            </div>
                          </td>
                        </tr>
                      )}
                      {cards.map((card, idx) => (
                        <Fragment key={idx}>
                          <tr>
                            <td>
                              <div className="card-detail">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-credit-card-2-back"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                                  <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                                </svg>
                                <label>{cc_format(card.number, 'x')}</label>
                                {card.primary && <div>Primary</div>}
                              </div>
                              <div className="button-group">
                                <button
                                  className="is-clickable delete-card-button"
                                  onClick={() => {
                                    setAddCard(false);
                                    clearCardFields();
                                    setDeleteCardId(card.id);
                                    setDeletingCard(true);
                                  }}
                                  type="button"
                                  disabled={
                                    !user.permissions.includes(
                                      Permissions.DELETE_CARD
                                    )
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-trash"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        </Fragment>
                      ))}
                    </tbody>
                  </table>
                  {!add_card && cards.length === 0 && (
                    <button
                      className="is-clickable add-card-button"
                      onClick={() => setAddCard(true)}
                      type="button"
                      disabled={
                        !user.permissions.includes(Permissions.ADD_CARD)
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        fill="currentColor"
                        className="bi bi-credit-card-2-front"
                        viewBox="0 0 16 16"
                      >
                        <path d="M14 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z" />
                        <path d="M2 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z" />
                      </svg>
                      Add Card
                    </button>
                  )}
                  {add_card && (
                    <div className="card-form-container">
                      <div className="card-form">
                        <label className="form-title">Add credit card</label>
                        <UIField
                          container_class="margin-bottom-0"
                          error_label={
                            card_no_error ||
                            api_field_errors.find(
                              (api_field_error) =>
                                api_field_error.field === 'number'
                            )?.message
                          }
                          has_icon={true}
                          icon_class="mt-[12px] mr-[15px]"
                          icon_svg={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-credit-card-2-back"
                              viewBox="0 0 16 16"
                            >
                              <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                              <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                            </svg>
                          }
                          id="CardNoField"
                          input_class="input-style"
                          is_error_state={
                            card_no_error.length > 0 ||
                            api_field_errors.some(
                              (api_field_error) =>
                                api_field_error.field === 'number'
                            )
                          }
                          label="Card number"
                          label_class="input-label"
                          max_length={23}
                          onBlur={(e: any) => {
                            if (add_card) {
                              const val = e.target.value;
                              if (val.length === 0) {
                                setCardNoError('error.number.required');
                              } else if (val.length < 14) {
                                setCardNoError('Invalid card number.');
                              }
                            }
                          }}
                          onChange={(e: any) => {
                            setCardNoError('');
                            setApiFieldErrors(
                              api_field_errors.filter(
                                (api_field_error) =>
                                  api_field_error.field !== 'number'
                              )
                            );
                            const val = e.target.value.toLowerCase();
                            if (!val.includes('c') && !val.includes('v')) {
                              setCardNo(cc_format(e.target.value));
                            }
                          }}
                          onKeyDown={allowNumbersOnly}
                          placeholder="xxxx-xxxx-xxxx-xxxx"
                          required={true}
                          type="text"
                          value={card_no}
                        />
                        <div className="two-column-field">
                          <UIField
                            container_class="margin-bottom-0"
                            error_label={
                              validation_error ||
                              api_field_errors.find(
                                (api_field_error) =>
                                  api_field_error.field === 'expiration'
                              )?.message
                            }
                            id="ExpirationField"
                            type="text"
                            input_class="input-style"
                            is_error_state={
                              validation_error.length > 0 ||
                              api_field_errors.some(
                                (api_field_error) =>
                                  api_field_error.field === 'expiration'
                              )
                            }
                            label="Expiration"
                            label_class="input-label"
                            max_length={5}
                            onBlur={validateExpiration}
                            onChange={(e: any) => {
                              setApiFieldErrors(
                                api_field_errors.filter(
                                  (api_field_error) =>
                                    api_field_error.field !== 'expiration'
                                )
                              );
                              handleOnChangeExpiration(e);
                            }}
                            onKeyDown={allowNumbersOnly}
                            placeholder="MM/YY"
                            required={true}
                            value={expiration}
                          />
                          <UIField
                            container_class="margin-bottom-0"
                            error_label={
                              cvv_cvc_error ||
                              api_field_errors.find(
                                (api_field_error) =>
                                  api_field_error.field === 'cvv_cvc'
                              )?.message
                            }
                            id="CvvCvcField"
                            type="text"
                            input_class="input-style"
                            is_error_state={
                              cvv_cvc_error.length > 0 ||
                              api_field_errors.some(
                                (api_field_error) =>
                                  api_field_error.field === 'cvv_cvc'
                              )
                            }
                            label="CVV/CVC"
                            label_class="input-label"
                            max_length={4}
                            onBlur={(e: any) => {
                              if (add_card) {
                                const val = e.target.value;
                                if (val.length === 0) {
                                  setCvvCvcError('error.cvv_cvc.required');
                                } else if (val.length < 3) {
                                  setCvvCvcError('error.cvv_cvc.invalid');
                                }
                              }
                            }}
                            onChange={(e: any) => {
                              setCvvCvcError('');
                              setApiFieldErrors(
                                api_field_errors.filter(
                                  (api_field_error) =>
                                    api_field_error.field !== 'cvv_cvc'
                                )
                              );
                              const val = e.target.value.toLowerCase();
                              if (!val.includes('c') && !val.includes('v')) {
                                setCvvCvc(e.target.value);
                              }
                            }}
                            onKeyDown={allowNumbersOnly}
                            placeholder="cvv/cvc"
                            required={true}
                            value={cvv_cvc}
                          />
                        </div>
                        <UIField
                          container_class="margin-bottom-0"
                          error_label={
                            api_field_errors.find(
                              (api_field_error) =>
                                api_field_error.field === 'cardholder_name'
                            )?.message
                          }
                          id="CardholderField"
                          type="text"
                          input_class="input-style"
                          is_error_state={api_field_errors.some(
                            (api_field_error) =>
                              api_field_error.field === 'cardholder_name'
                          )}
                          label="Cardholder name"
                          label_class="input-label"
                          onChange={(e: any) => {
                            setApiFieldErrors(
                              api_field_errors.filter(
                                (api_field_error) =>
                                  api_field_error.field !== 'cardholder_name'
                              )
                            );
                            setCardholder(e.target.value);
                          }}
                          placeholder="cardholder name"
                          value={cardholder}
                        />
                        <div className="country-field">
                          <label>Country</label>
                          <Dropdown
                            content={
                              <div className="dropdown-content-container">
                                {countries.map((country, idx) => (
                                  <span
                                    key={idx}
                                    className="drop-down-font is-clickable"
                                    onClick={() => setCountrySelected(country)}
                                  >
                                    {country.country}
                                  </span>
                                ))}
                              </div>
                            }
                            label={
                              <span
                                className="country-label"
                                style={
                                  !country_selected?.country
                                    ? {
                                        color: '#888399',
                                        fontWeight: 'lighter',
                                      }
                                    : {}
                                }
                              >
                                {country_selected?.country || 'country'}
                                <span className="mt-[4px] text-[#110733]">
                                  <ChevronDownIcon />
                                </span>
                              </span>
                            }
                            container_class="dropdown-container"
                            content_class="dropdown-content"
                            label_class="drop-down-button"
                          />
                        </div>
                        <div className="button-group">
                          <button
                            className={`${
                              loading ? '' : 'is-clickable '
                            }secondary-button`}
                            onClick={() => {
                              clearCardFields();
                              setAddCard(false);
                            }}
                            disabled={loading}
                            type="button"
                          >
                            Cancel
                          </button>
                          <button
                            className={`${
                              disabled_button ? '' : 'is-clickable '
                            }primary-button`}
                            onClick={addCard}
                            disabled={disabled_button}
                            type="button"
                          >
                            {loading ? 'Loading...' : 'Add Card'}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="subscriptions">
                  <h3>Subscriptions</h3>
                  {subscriptions.length === 0 && (
                    <div className="no-subscription">
                      <label className="trial-ended">
                        {user.subscription?.is_trial
                          ? 'Your 14-day free trial has ended. '
                          : ''}
                        Keep collecting invaluable insights from your customers.
                        Subscribe{' '}
                        <a
                          href="/pricing"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: 'blue' }}
                        >
                          here
                        </a>
                        .
                      </label>
                    </div>
                  )}
                  {subscriptions.length > 0 && (
                    <table>
                      <thead>
                        <tr>
                          <th className="plan-type-width">Plan Type</th>
                          <th className="billing-cycle-width">Billing Cycle</th>
                          <th className="total-width">Total</th>
                          <th className="cancel-width"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {subscriptions.map((subscription, idx) => (
                          <tr key={idx}>
                            <td className="plan-type-width">
                              <div className="plan-type">
                                {`${subscription?.name}${
                                  subscription?.is_trial
                                    ? user.user?.is_beta
                                      ? ' (Beta)'
                                      : ' (Trial)'
                                    : ''
                                }`}
                                {(subscription.cancel_at_period_end ||
                                  subscription.status === 'canceled') && (
                                  <span style={{ color: 'red' }}>
                                    {' (cancelled)'}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="billing-cycle-width">
                              <div className="billing-cycle">
                                {!user.user?.is_beta && (
                                  <Fragment>
                                    {moment(
                                      subscription.current_period_start
                                    ).format('DD/MM/YYYY')}{' '}
                                    -{' '}
                                    <div
                                      className={billingCycleStyle(
                                        subscription
                                      )}
                                    >
                                      {subscription.mode !==
                                      CheckoutMode.ONE_TIME
                                        ? moment(
                                            subscription.current_period_end
                                          ).format('DD/MM/YYYY')
                                        : subscription.current_period_end.toString()}
                                    </div>
                                    {getRemainingDays(subscription) <= 7 &&
                                      getRemainingDays(subscription) > 0 && (
                                        <>
                                          <span className="tooltip">
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="16"
                                              height="16"
                                              fill="currentColor"
                                              className="bi bi-exclamation-circle"
                                              viewBox="0 0 16 16"
                                            >
                                              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
                                            </svg>
                                            <span className="tooltiptext">
                                              Plan will end on{' '}
                                              {subscription.mode !==
                                              CheckoutMode.ONE_TIME
                                                ? moment(
                                                    subscription.current_period_end
                                                  ).format('MMM DD')
                                                : subscription.current_period_end.toString()}
                                            </span>
                                          </span>
                                        </>
                                      )}
                                  </Fragment>
                                )}
                              </div>
                            </td>
                            <td className="total-width">
                              <div className="total">{`$${
                                user.subscription?.is_trial
                                  ? 0
                                  : subscription?.price
                              }`}</div>
                            </td>
                            <td className="cancel-subscription">
                              {['active', 'succeeded'].includes(
                                subscription.status
                              ) && !subscription.cancel_at_period_end ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-calendar2-x is-clickable"
                                  viewBox="0 0 16 16"
                                  onClick={() => {
                                    setCancelSubsId(subscription?.id || 0);
                                    setCancellingSubscription(true);
                                  }}
                                >
                                  <path d="M6.146 8.146a.5.5 0 0 1 .708 0L8 9.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 10l1.147 1.146a.5.5 0 0 1-.708.708L8 10.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 10 6.146 8.854a.5.5 0 0 1 0-.708z" />
                                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
                                  <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z" />
                                </svg>
                              ) : (
                                <div></div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
                <div className="invoice-history">
                  <h3>Invoice History</h3>
                  {invoices && (
                    <table>
                      <thead>
                        <tr>
                          <th className="billed-on-width">Billed on</th>
                          <th className="status-width">Status</th>
                          <th className="description-width">Description</th>
                          <th className="total-width">Total</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoices
                          .filter(
                            (invoice) =>
                              invoice.invoice_pdf &&
                              invoice.invoice_pdf.length > 0
                          )
                          .map((invoice, idx) => (
                            <tr key={idx}>
                              <td className="billed-on-width">
                                {moment(invoice.billed_on).format('DD/MM/YYYY')}
                              </td>
                              <td className="status-width">
                                <div
                                  className="status-badge"
                                  style={{
                                    background: `${
                                      invoice.status == 'Paid'
                                        ? '#D1FAE5'
                                        : '#B60104'
                                    }`,
                                    color: `${
                                      invoice.status == 'Paid'
                                        ? '#4D4566'
                                        : '#FFFFFF'
                                    }`,
                                  }}
                                >
                                  {invoice.status}
                                </div>
                              </td>
                              <td className="description-width">
                                {invoice.description}
                              </td>
                              <td className="total-width">{`$${invoice.total}`}</td>
                              <td className="flex items-center justify-end export-pdf">
                                {user.permissions.includes(
                                  Permissions.DOWNLOAD_INVOICE
                                ) ? (
                                  <a
                                    className="is-clickable"
                                    href={`${invoice.invoice_pdf}`}
                                    download
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      fill="currentColor"
                                      className="bi bi-file-earmark-pdf"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                                      <path d="M4.603 14.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.697 19.697 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.188-.012.396-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 0 0 .98 1.686 5.753 5.753 0 0 1 1.334.05c.364.066.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.856.856 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.712 5.712 0 0 1-.911-.95 11.651 11.651 0 0 0-1.997.406 11.307 11.307 0 0 1-1.02 1.51c-.292.35-.609.656-.927.787a.793.793 0 0 1-.58.029zm1.379-1.901c-.166.076-.32.156-.459.238-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361.01.022.02.036.026.044a.266.266 0 0 0 .035-.012c.137-.056.355-.235.635-.572a8.18 8.18 0 0 0 .45-.606zm1.64-1.33a12.71 12.71 0 0 1 1.01-.193 11.744 11.744 0 0 1-.51-.858 20.801 20.801 0 0 1-.5 1.05zm2.446.45c.15.163.296.3.435.41.24.19.407.253.498.256a.107.107 0 0 0 .07-.015.307.307 0 0 0 .094-.125.436.436 0 0 0 .059-.2.095.095 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a3.876 3.876 0 0 0-.612-.053zM8.078 7.8a6.7 6.7 0 0 0 .2-.828c.031-.188.043-.343.038-.465a.613.613 0 0 0-.032-.198.517.517 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822.024.111.054.227.09.346z" />
                                    </svg>
                                  </a>
                                ) : (
                                  <svg
                                    style={{ opacity: '50%' }}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-file-earmark-pdf"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                                    <path d="M4.603 14.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.697 19.697 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.188-.012.396-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 0 0 .98 1.686 5.753 5.753 0 0 1 1.334.05c.364.066.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.856.856 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.712 5.712 0 0 1-.911-.95 11.651 11.651 0 0 0-1.997.406 11.307 11.307 0 0 1-1.02 1.51c-.292.35-.609.656-.927.787a.793.793 0 0 1-.58.029zm1.379-1.901c-.166.076-.32.156-.459.238-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361.01.022.02.036.026.044a.266.266 0 0 0 .035-.012c.137-.056.355-.235.635-.572a8.18 8.18 0 0 0 .45-.606zm1.64-1.33a12.71 12.71 0 0 1 1.01-.193 11.744 11.744 0 0 1-.51-.858 20.801 20.801 0 0 1-.5 1.05zm2.446.45c.15.163.296.3.435.41.24.19.407.253.498.256a.107.107 0 0 0 .07-.015.307.307 0 0 0 .094-.125.436.436 0 0 0 .059-.2.095.095 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a3.876 3.876 0 0 0-.612-.053zM8.078 7.8a6.7 6.7 0 0 0 .2-.828c.031-.188.043-.343.038-.465a.613.613 0 0 0-.032-.198.517.517 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822.024.111.054.227.09.346z" />
                                  </svg>
                                )}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </SettingsContainer>
            </Settings>
          )}
        </>
      )}
      <Modal
        centered={true}
        className="modal-container flex items-center justify-center h-screen w-full"
        contentClassName="content-container"
        isOpen={deleting_card || cancelling_subscription}
      >
        <ModalHeader className="popup-title">
          <div
            className="is-clickable x-close"
            onClick={() => {
              setDeletingCard(false);
              setCancellingSubscription(false);
            }}
            role="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              className="bi bi-x"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </div>
          {deleting_card && (
            <label className="popup-title">Delete credit card info</label>
          )}
        </ModalHeader>
        <ModalBody className="popup-body">
          {deleting_card
            ? 'Are you sure you want to delete you credit card? If you do, your plan will be cancelled at the end of the current billing cycle.'
            : cancelling_subscription
              ? 'Are you sure you want to cancel your subscription?'
              : ''}
        </ModalBody>
        {(deleting_card || cancelling_subscription) && (
          <ModalFooter className="popup-footer">
            <button
              className={`${loading ? '' : 'is-clickable '}cancel-button`}
              disabled={loading}
              onClick={() => {
                setDeletingCard(false);
                setCancellingSubscription(false);
              }}
              type="button"
            >
              {deleting_card ? 'Cancel' : cancelling_subscription ? 'No' : ''}
            </button>
            <button
              className={`${loading ? '' : 'is-clickable '}delete-button`}
              disabled={loading}
              onClick={() => {
                if (deleting_card) {
                  deleteCard();
                }
                if (cancelling_subscription) {
                  handleCancelSubscription();
                }
              }}
              type="button"
            >
              {deleting_card ? 'Delete' : cancelling_subscription ? 'Yes' : ''}
            </button>
          </ModalFooter>
        )}
      </Modal>
    </Fragment>
  );
}
