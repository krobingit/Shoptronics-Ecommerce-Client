import { IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { medium, small, large } from "../responsive";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import { useState, forwardRef } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useConfirm } from "material-ui-confirm";
import { useHistory } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const Container = styled.div``;
const CartListContainer = styled.div`
  padding: 1rem;
  margin-bottom: 1.5rem;
  display: flex;
  gap: 1rem;
  justify-content: space-evenly;
  background: rgba(255, 255, 255, 0.55);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  ${large({ flexDirection: "column", width: "100%", alignItems: "center" })}
`;
const CartImage = styled.img`
  width: 14rem;
  height: 10rem;
  cursor: pointer;
  ${small({ width: "12rem" })}
`;
const DetailContainer = styled.div`
  display: flex;
  gap: 4rem;
  ${medium({ flexDirection: "column", gap: "1.2rem", alignItems: "center" })}
`;
const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 13rem;
  margin-right: 0.6rem;
  ${medium({
    flexDirection: "column",
    justifyContent: "space-around",
    width: "100%",
  })}
`;
const ProductName = styled.h4`
  margin: 0;
  color: black;
  font-size: 1.2rem;
  text-align: center;
`;
const PriceContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  width: 7rem;
  ${medium({
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  })}
`;
const ProductPrice = styled.h4`
  font-size: 1.3rem;
  margin: 0;
`;
const QuantityContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  width: 7rem;
  ${medium({
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  })}
`;

const ProductQuantity = styled.h4`
  font-size: 1.3rem;
  margin: 0;
  color: black;
`;
const SubTotalContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  width: 7rem;
  ${medium({
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  })}
`;
const ProductSubTotal = styled.h4`
  font-size: 1.4rem;
  margin: 0;
  color: black;
`;
const Remove = styled.div``;
const QuantityActions = styled.div`
  display: flex;
  align-items: center;
`;
export const CartList = () => {
  const { products, total, quantity } = useSelector((state) => state.cart);
  const confirm = useConfirm();
  let history = useHistory();

  console.log({ products, total, quantity });
  const dispatch = useDispatch();
  //For SNACKBAR ALERT
  const [notify, setNotify] = useState(false);
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [open, setOpen] = useState(false);
  const [transition, setTransition] = useState(undefined);

  const handleClick = (Transition) => {
    setTransition(() => Transition);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }
  return (
    <Container>
      {products.map((product, idx) => (
        <CartListContainer key={idx}>
          <CartImage
            src={product.image}
            onClick={() => history.push(`/product/${product._id}`)}
          />
          <DetailContainer>
            <NameContainer>
              <ProductName>{product.name}</ProductName>
            </NameContainer>

            <PriceContainer>
              <ProductPrice>Price</ProductPrice>
              <ProductPrice>
                ₹{Math.round(product.price).toLocaleString()}
              </ProductPrice>
              <ProductPrice
                style={{
                  color: "green",
                  textDecoration: "line-through grey solid",
                }}
              >
                ₹{(Math.round(product.price) + 10000).toLocaleString()}
              </ProductPrice>
            </PriceContainer>

            <QuantityContainer>
              <ProductQuantity>Quantity</ProductQuantity>
              <QuantityActions>
                <AddCircleIcon
                  style={{
                    color: "#141e30",
                    cursor: "pointer",
                    fontSize: "1.5rem",
                  }}
                  onClick={() =>
                    dispatch({
                      type: "AddQuantity",
                      index: products.indexOf(product),
                    })
                  }
                />
                <ProductQuantity
                  style={{
                    padding: "0.4rem",
                    fontSize: "1.5rem",
                    color: "#141e30",
                  }}
                >
                  {product.quantity}
                </ProductQuantity>
                <RemoveCircleIcon
                  style={{
                    color: "#141e30",
                    cursor: "pointer",
                    fontSize: "1.5rem",
                  }}
                  onClick={async () => {
                    if (product.quantity > 1)
                      dispatch({
                        type: "RemoveQuantity",
                        index: products.indexOf(product),
                      });
                    else {
                      await confirm({
                        description: `Do you want to remove this item from cart?`,
                      }).then(() => {
                        dispatch({
                          type: "RemoveItem",
                          payload: product,
                          index: products.indexOf(product),
                        });
                        setNotify(true);
                        handleClick(TransitionLeft);
                      });
                    }
                  }}
                />
              </QuantityActions>
            </QuantityContainer>

            <SubTotalContainer>
              <h4 style={{fontSize:"1.3rem",color:"black"}}>Total Price</h4>
              <ProductSubTotal >
                ₹
                {(
                  Math.round(product.price) * product.quantity
                ).toLocaleString()}
              </ProductSubTotal>
            </SubTotalContainer>
          </DetailContainer>
          {notify && (
            <>
              <Snackbar
                TransitionComponent={transition}
                key={transition ? transition.name : ""}
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity="warning"
                  sx={{ width: "100%" }}
                >
                  Item removed from your Cart!
                </Alert>
              </Snackbar>
            </>
          )}
          <Remove>
            <IconButton
              style={{ color: "#2d2d2d" }}
              onClick={async () => {
                await confirm({
                  description: `Do you want to remove this item from cart?`,
                })
                  .then(() => {
                    dispatch({
                      type: "RemoveItem",
                      payload: product,
                      index: products.indexOf(product),
                    });
                    setNotify(true);
                    handleClick(TransitionLeft);
                  })
                  .catch((err) => err && console.log(err));
              }}
            >
              <DeleteIcon style={{ fontSize: "2.3rem", color: "orangered" }} />
            </IconButton>
          </Remove>
        </CartListContainer>
      ))}
    </Container>
  );
};
