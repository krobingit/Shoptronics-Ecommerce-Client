import { AdminNav } from "../Components/AdminNavBar";
import { useState, useEffect } from "react";
import { commonRequest } from "../axiosreq";
import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";
import { Title } from "../Pages/Home";
import { IconButton } from "@mui/material";
import DotLoader from "react-spinners/DotLoader";
import { useSelector } from "react-redux";
import { useConfirm } from "material-ui-confirm";
import { useHistory } from "react-router-dom";
import { Button } from "semantic-ui-react";
/*
background-color: #7f5a83;
background-image: linear-gradient(315deg, #7f5a83 0%, #0d324d 74%);*/
const Container = styled.div`
  min-height: 100vh;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const GridContainer = styled.div`
  width: 100%;
  height: 35rem;
  background: rgba(255, 255, 255, 0);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;
const LoaderContainer = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
`;
const NewUser = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  margin-right: 1rem;
`;
export const AdminUserList = () => {
  const history = useHistory();
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState(null);
  const confirm = useConfirm();
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    await commonRequest
      .get("/user", {
        headers: { token: currentUser.token },
      })
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    const getUsers = async () => {
      await commonRequest
        .get("/user", {
          headers: { token: currentUser.token },
        })
        .then((res) => {
          setUsers(res.data);
          setLoading(false);
        });
    };
    getUsers();
  }, [currentUser.token]);

  const deleteUser = async (id) => {
    const response = await commonRequest.delete(`/user/${id}`, {
      headers: { token: currentUser.token },
    });
    console.log(response);
    getUsers();
  };
  const columns = [
    {
      field: "_id",
      headerName: "Order ID",
      width: 230,
    },
    {
      field: "username",
      headerName: "UserName",
      width: 200,
    },

    {
      field: "email",
      headerName: "Email",
      width: 220,
    },
    {
      field: "createdAt",
      headerName: "Created Date",
      width: 150,
      type: "number",
      renderCell: ({ row }) => {
        return (
          <>
            <p>{new Date(row.createdAt).toLocaleDateString()}</p>
          </>
        );
      },
    },

    {
      field: "isAdmin",
      headerName: "Admin Access",
      type: "boolean",
      width: 180,
      renderCell: ({ row }) => {
        return (
          <>
            <p>
              {row.isAdmin ? (
                <i
                  style={{ fontSize: "1.4rem",color:"#141e30" }}
                  className="fas fa-user-check"
                ></i>
              ) : (
                <i
                  style={{ fontSize: "1.4rem",color:"#141e30" }}
                  className="fas fa-user-alt-slash"
                ></i>
              )}
            </p>
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Actions",
      width: 150,
      renderCell: ({ row }) => {
        return (
          <ButtonContainer>
            <IconButton
              onClick={() => history.push(`/adminUserEdit/${row._id}`)}
            >
              <i className="fas fa-edit" style={{ color: "goldenrod" }}></i>
            </IconButton>
            <IconButton
              onClick={async () => {
                await confirm({
                  description: `Do you want to delete this user`,
                }).then(() => deleteUser(row._id));
              }}
            >
              <i className="fas fa-user-minus" style={{ color: "red" }}></i>
            </IconButton>
          </ButtonContainer>
        );
      },
    },
  ];

  function UserList() {
    return (
      <GridContainer>
        <DataGrid
          style={{ color: "black", fontSize: "1.1rem", borderColor: "gold" }}
          rows={users}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          getRowId={(row) => row._id}
          checkboxSelection
          disableSelectionOnClick
        />
      </GridContainer>
    );
  }

  return (
    <>
      <AdminNav />
      <Title>Users</Title>
      {loading ? (
        <LoaderContainer>
          <DotLoader loading={loading} color="#FFEC03" size={60} />
        </LoaderContainer>
      ) : (
        <>
          <NewUser>
            <Button
              color="yellow"
              onClick={() => history.push("/adminUserAdd")}
            >
              Add USER
            </Button>
          </NewUser>
          <Container>
            <UserList />
          </Container>
        </>
      )}
    </>
  );
};
