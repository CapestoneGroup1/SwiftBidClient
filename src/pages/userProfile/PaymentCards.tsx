import React, { useEffect, useState } from "react";
import BackgroundWrapper from "../../components/common/BackgroundWrapper";
import {
  Grid,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  FormLabel,
  InputAdornment,
  Paper,
  IconButton,
  Alert,
  CircularProgress,
  Select,
  MenuItem,
} from "@mui/material";
import CustomButton from "../../components/common/CustomButton";
import {
  useAddNewCard,
  useDeleteCard,
  useGetProfile,
  useGetUserSavedCards,
  useSetCardAsPrimary,
} from "../../api/profile";
import { Delete, Star } from "@mui/icons-material";
import { useAppContext } from "../../components/AppWrapper";
import { env } from "../../utils/env";
import PageDescription from "../../components/common/PageDescription";
import { profileDispatchAction } from "../../context/ActionCreators";
import { User } from "../../utils/types";

export default function PaymentCards() {
  const [modal, setModal] = useState(false);
  const [nameOnCard, setNameOnCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCVV] = useState("");
  const [errors, setErrors] = useState<any>({});
  const { user, dispatch } = useAppContext();
  const { data: savedCards, refetch } = useGetUserSavedCards();
  const [cardType, setCardType] = useState("");
  const { data: profileData, fetchData: refetchProfile } = useGetProfile();
  const { postData: setActiveCard, isLoading: activecardLoading } =
    useSetCardAsPrimary(refetch);

  useEffect(() => {
    if (profileData) {
      dispatch(profileDispatchAction(profileData));
    }
  }, [profileData]);

  const clearFields = () => {
    setNameOnCard("");
    setCardNumber("");
    setExpiryMonth("");
    setExpiryYear("");
    setCVV("");
    setCardType("");
    setModal(false); // Close the modal
  };

  const { postData: addCard, isLoading: addCardLoading } = useAddNewCard(() => {
    clearFields();
    refetch();
  });

  const { postData: deleteCard, isLoading: deleteLoading } =
    useDeleteCard(refetch);

  const validateForm = () => {
    const errors = {} as any;
    if (!nameOnCard.trim()) {
      errors.nameOnCard = "Name on card is required";
    }
    if (!cardNumber.trim()) {
      errors.cardNumber = "Card number is required";
    } else if (!/^\d{16}$/.test(cardNumber.trim())) {
      errors.cardNumber = "Card number should be 16 digits";
    }
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // Month is zero-based
    if (!expiryMonth.trim()) {
      errors.expiryMonth = "Expiry month is required";
    } else if (parseInt(expiryMonth) < 1 || parseInt(expiryMonth) > 12) {
      errors.expiryMonth = "Expiry month should be between 1 and 12";
    }

    if (!expiryYear.trim()) {
      errors.expiryYear = "Expiry year is required";
    } else if (
      parseInt(expiryYear) < currentYear ||
      (parseInt(expiryYear) === currentYear &&
        parseInt(expiryMonth) < currentMonth)
    ) {
      errors.expiryYear = "Expiry date should be in the future";
    }
    if (!cvv.trim()) {
      errors.cvv = "CVV is required";
    } else if (!/^\d{3}$/.test(cvv)) {
      errors.cvv = "CVV should be 3 digits";
    }

    if (!cardType.trim()) {
      errors.cardType = "Card type is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const saveCreditCard = () => {
    if (validateForm()) {
      addCard({
        name: nameOnCard,
        address_country: "",
        address_zip: "",
        cvc: cvv,
        exp_month: expiryMonth,
        exp_year: expiryYear,
        number: cardNumber,
        testCardToken: cardType,
      });
    }
  };

  const handleDeleteCard = (cardId: string) => {
    if (deleteLoading) return;
    deleteCard({}, env.api.deletecard + "/" + cardId);
  };

  const handleSetPrimaryCard = async (cardId: string) => {
    await setActiveCard({}, env.api.setprimary + "/" + cardId);
    refetchProfile();
  };

  return (
    <BackgroundWrapper>
      <Grid container alignItems="center">
        <Grid item container justifyContent="center">
          <Grid item display="flex" flexDirection="column" alignItems="center">
            <PageDescription
              title="Saved Cards"
              caption="Note: There should be at least one active card set for Auto debit
          in order to bid for products"
            ></PageDescription>
            <br />
            <Button
              variant="contained"
              style={{ backgroundColor: "white", color: "black" }}
              onClick={() => setModal(true)}
            >
              Add New Card
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={2} justifyContent="center">
        {savedCards &&
          savedCards.map((card) => (
            <Grid item xs={8} sm={4} md={3} key={card.cardId}>
              <Paper
                elevation={3}
                style={{
                  padding: "1rem",
                  position: "relative",
                }}
              >
                <IconButton
                  aria-label="delete"
                  style={{ position: "absolute", top: "5px", right: "5px" }}
                  onClick={() => handleDeleteCard(card.cardId)}
                >
                  <Delete color="error" />
                </IconButton>
                <Typography variant="h6">{card.brand}</Typography>
                <Typography variant="body1">
                  **** **** **** {card.number}
                </Typography>
                <Typography variant="body2">
                  Expires: {card.exp_month}/{card.exp_year}
                </Typography>
                <br />
                {user.primaryCard !== card.cardId && (
                  <Button
                    variant="outlined"
                    disabled={activecardLoading}
                    size="small"
                    startIcon={<Star />}
                    onClick={() => handleSetPrimaryCard(card.cardId)}
                  >
                    {activecardLoading ? (
                      <CircularProgress />
                    ) : (
                      "Set as Primary"
                    )}
                  </Button>
                )}
                {user.primaryCard === card.cardId && (
                  <Button
                    variant="outlined"
                    size="small"
                    color="success"
                    onClick={() => {}}
                  >
                    Active Card
                  </Button>
                )}
              </Paper>
            </Grid>
          ))}
      </Grid>
      <Dialog
        open={modal}
        onClose={() => clearFields()}
        title="Add New Payment Card"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Payment Card</DialogTitle>
        <DialogContent>
          <br />
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextField
                fullWidth
                label="Name on Card"
                variant="outlined"
                value={nameOnCard}
                onChange={(e) => setNameOnCard(e.target.value)}
                error={!!errors.nameOnCard}
                helperText={errors.nameOnCard}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                type="number"
                label="Card Number"
                variant="outlined"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                error={!!errors.cardNumber}
                helperText={errors.cardNumber}
              />
            </Grid>
            <Grid container item spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Expiry Month"
                  type="number"
                  variant="outlined"
                  value={expiryMonth}
                  onChange={(e) => setExpiryMonth(e.target.value)}
                  error={!!errors.expiryMonth}
                  helperText={errors.expiryMonth}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Expiry Year"
                  variant="outlined"
                  type="number"
                  value={expiryYear}
                  onChange={(e) => setExpiryYear(e.target.value)}
                  error={!!errors.expiryYear}
                  helperText={errors.expiryYear}
                />
              </Grid>
            </Grid>
            <Grid container item spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth variant="outlined" error={!!errors.cvv}>
                  <FormLabel>CVV</FormLabel>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={cvv}
                    type="number"
                    onChange={(e) => setCVV(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {errors.cvv}
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  error={!!errors.cardType}
                >
                  <FormLabel>Card Type</FormLabel>
                  <Select
                    value={cardType}
                    onChange={(e) => setCardType(e.target.value)}
                  >
                    <MenuItem value="tok_visa">Visa</MenuItem>
                    <MenuItem value="tok_visa_debit">Visa (debit)</MenuItem>
                    <MenuItem value="tok_mastercard">Mastercard</MenuItem>
                    <MenuItem value="tok_mastercard_debit">
                      Mastercard (debit)
                    </MenuItem>
                    <MenuItem value="tok_mastercard_prepaid">
                      Mastercard (prepaid)
                    </MenuItem>
                    <MenuItem value="tok_amex">American Express</MenuItem>
                    <MenuItem value="tok_discover">Discover</MenuItem>
                    <MenuItem value="tok_diners">Diners Club</MenuItem>
                    <MenuItem value="tok_jcb">JCB</MenuItem>
                    <MenuItem value="tok_unionpay">UnionPay</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <CustomButton
            onClick={saveCreditCard}
            name="Save Card"
            loading={addCardLoading}
          />
        </DialogActions>
      </Dialog>
    </BackgroundWrapper>
  );
}
