import {
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  Box,
  Dialog,
  DialogContent,
  DialogActions,
  Fab,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Grid2 from "@mui/material/Unstable_Grid2";
import { signOut } from "firebase/auth";
import { auth, db } from "../services/databaseService";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import LogoutIcon from "@mui/icons-material/Logout";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import AddIcon from "@mui/icons-material/Add";

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Fjalla One",
    },
  },
});

const TodoList = () => {
  const navigate = useNavigate();
  const [tarefas, setTarefas] = useState([]);
  const [textoTarefa, setTextoTarefa] = useState("");
  const [textoDescricao, setTextoDescricao] = useState("");
  const [urgencia, setUrgencia] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const [tarefa, setTarefa] = useState();
  const [open, setOpen] = useState(false);
  const [concluida, setConcluida] = useState(false);
  const [tarefasConcluidas, setTarefasConcluidas] = useState(0);
  const [card, setCard] = useState(false);

  const mudaTema = () => {
    setDarkMode(!darkMode);
  };

  const mudaLayout = () => {
    setCard(!card);
  };

  useEffect(() => {
    const salvaDarkMode = JSON.parse(localStorage.getItem("salvaDarkMode"));
    if (salvaDarkMode) {
      setDarkMode(salvaDarkMode);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("salvaDarkMode", darkMode);
  }, [darkMode]);

  const cores = {
    1: darkMode ? "#CBCBCB" : "#CBCBCB",
    2: darkMode ? "#726676" : "#DFF8B5",
    3: darkMode ? "#ABA9A9" : "#DECBE6",
    4: darkMode ? "#93A1B8" : "#CBDEFF",
    5: darkMode ? "#A7C2AF" : "#BDDDC7",
  };

  //adicionar ou editar
  const trataTarefas = () => {
    if (tarefa) {
      editaTarefa(tarefa.id);
    } else {
      addTarefa();
    }
  };

  const addTarefa = async () => {
    const novoArray = [...tarefas];
    const novaTarefa = {
      nome: textoTarefa,
      descricao: textoDescricao,
      feito: false,
      urgencia: urgencia,
      edita: false,
      userId: auth.currentUser.uid,
    };

    try {
      const docRef = await addDoc(collection(db, "todolist"), novaTarefa);
      console.log("Document written with ID: ", docRef.id);
      novaTarefa.id = docRef.id;
      setTarefas();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setTextoTarefa("");
    setTextoDescricao("");

    if (!textoTarefa) {
      return alert("Não é possível adicionar tarefas em branco");
    }

    //nível de urgência (1 mais urgente,
    novoArray.push(novaTarefa);
    novoArray.sort((a, b) => a.urgencia - b.urgencia);
    setTarefas(novoArray);
  };

  //lê as tarefas do firestore
  useEffect(() => {
    fetchData();
  }, []);

  const abreAddTarefa = () => {
    setOpen(true);
  };

  const fechaAddTarefa = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    const novaTarefa = [];
    const q = query(
      collection(db, "todolist"),
      where("userId", "==", auth.currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      novaTarefa.push({ ...doc.data(), id: doc.id });
    });
    setTarefas(novaTarefa);
  };

  //envia o nome/descriçao da tarefa para o formulario
  const editaFormulario = (id) => {
    const editaTarefa = tarefas.find((tarefa) => tarefa.id === id);
    setOpen(true);
    setTarefa(editaTarefa);
    setTextoTarefa(editaTarefa.nome);
    setTextoDescricao(editaTarefa.descricao);
  };

  //atualiza a tarefa editada na lista e salva no firestore
  const editaTarefa = async (id) => {
    const tarefaRef = doc(db, "todolist", id);
    await updateDoc(tarefaRef, {
      nome: textoTarefa,
      descricao: textoDescricao,
      urgencia: urgencia,
    });

    const editaNome = tarefas.map((tarefa) => {
      if (tarefa.id === id) {
        tarefa.nome = textoTarefa;
        tarefa.descricao = textoDescricao;
        tarefa.urgencia = urgencia;
      }
      return tarefa;
    });
    setTarefa(null);
    setTarefas(editaNome);
    setTextoTarefa("");
    setTextoDescricao("");
  };

  //check na tarefa feita
  const mudaEstado = async (id) => {
    const tarefaRef = doc(db, "todolist", id);
    await updateDoc(tarefaRef, {
      feito: concluida,
    });
    setTarefas((estadoAtual) => {
      const novoEstado = [...estadoAtual];
      novoEstado.filter((tarefa) => {
        if (tarefa.id == id) {
          tarefa.feito = !tarefa.feito;
          setConcluida(!concluida);
        } else {
          return tarefa;
        }
        console.log(tarefa.feito);
      });

      return novoEstado;
    });
  };
  const mudaUrgencia = async (id, urgencia) => {
    const tarefaRef = doc(db, "todolist", id);
    await updateDoc(tarefaRef, {
      urgencia: urgencia,
    });
    const novaUrgencia = [...tarefas];
    novaUrgencia.filter((tarefa) => {
      if (tarefa.id === id) {
        tarefa.urgencia = urgencia;
        return tarefa;
      } else {
        return tarefa;
      }
    });
    novaUrgencia.sort((a, b) => b.urgencia - a.urgencia);
    setTarefas(novaUrgencia);
  };

  const deletaTarefa = async (id) => {
    const tarefaRef = doc(db, "todolist", id);
    await deleteDoc(tarefaRef);
    const listaAtualizada = tarefas.filter((tarefa) => tarefa.id !== id);
    setTarefas(listaAtualizada);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      }
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Grid2
        sx={{
          height: "100vh",
          width: "100vw",
          overflow: "auto",
          background: darkMode ? "#051923" : "#dedbd2",
        }}
      >
        {auth.currentUser && (
          <Grid2
            item
            sm={12}
            sx={{
              height: "8%",
              width: "100%",
              backgroundColor: darkMode ? "#051923" : "#dedbd2",
              margin: "1%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Avatar
                  sx={{ width: 40, height: 40 }}
                  src={auth.currentUser?.photoURL}
                />{" "}
                <Typography
                  fontSize={20}
                  fontWeight={"bold"}
                  sx={{
                    color: darkMode ? "#c5c3c6" : "#393939",
                    margin: "0 15px",
                  }}
                >
                  {"Olá, " + auth.currentUser?.displayName}!
                </Typography>
              </Box>

              <Box>
                {" "}
                <IconButton aria-label="Dark Mode" onClick={() => mudaTema()}>
                  <Brightness4Icon sx={{ color: "#25859c" }} />
                </IconButton>
                <IconButton
                  aria-label="Logout"
                  onClick={() =>
                    signOut(auth).then(() => {
                      console.log("deslogado");
                    })
                  }
                >
                  <LogoutIcon sx={{ color: "#25859c" }} />
                </IconButton>
              </Box>
            </Box>
          </Grid2>
        )}

        {auth.currentUser && (
          <>
            <Grid2 item sm={12}>
              <Grid2 sm={12} textAlign="center" alignItems="center">
                <Typography
                  sx={{
                    fontSize: "70px",
                    margin: "auto",
                    padding: "25px",
                    color: darkMode ? "#c5c3c6" : "#393939",
                  }}
                >
                  To-do List
                </Typography>
              </Grid2>

              {tarefas.map((tarefa) => {
                return (
                  <Grid2
                    container
                    key={tarefa.id}
                    alignItems="center"
                    sx={{
                      backgroundColor: cores[tarefa.urgencia],
                      textDecoration:
                        tarefa.feito === false ? "" : "line-through",
                      maxHeight: "100px",
                      width: { sm: "50%", xs: "90%" },
                      padding: "0 10px",
                      margin: "auto",
                      marginBottom: "1%",
                      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
                    }}
                    borderRadius="15px"
                  >
                    <Grid2 item sm={1}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={tarefa.feito}
                            onChange={() => mudaEstado(tarefa.id)}
                          />
                        }
                      ></FormControlLabel>
                    </Grid2>

                    <Grid2 item sm={6}>
                      <Typography p={"10px 0 2px"} fontWeight={"bold"}>
                        {tarefa.nome}
                      </Typography>
                      <Typography p={"2px 0 10px"}>
                        {tarefa.descricao}
                      </Typography>
                    </Grid2>

                    <Grid2 item sm={5} textAlign="right">
                      <FormControl>
                        <Select
                          sx={{ borderRadius: "100px" }}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          size="small"
                          value={tarefa.urgencia}
                          onChange={(e) =>
                            mudaUrgencia(tarefa.id, e.target.value)
                          }
                        >
                          {[1, 2, 3, 4, 5].map((item) => (
                            <MenuItem key={item} value={item}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <IconButton
                        aria-label="edit"
                        onClick={() => editaFormulario(tarefa.id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => deletaTarefa(tarefa.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid2>
                    <Divider />
                  </Grid2>
                );
              })}

              <Grid2
                sm={12}
                sx={{
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  margin: "auto",
                }}
              >
                <Fab aria-label="add" onClick={abreAddTarefa}>
                  <AddIcon />
                </Fab>

                <Dialog
                  open={open}
                  onClose={fechaAddTarefa}
                  sx={{ borderRadius: "20px" }}
                >
                  <DialogContent>
                    <FormControl fullWidth>
                      <TextField
                        id="outlined-basic"
                        label="Nova tarefa"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={textoTarefa}
                        onChange={(e) => setTextoTarefa(e.target.value)}
                      />
                    </FormControl>
                    <FormControl fullWidth>
                      <TextField
                        id="outlined-basic"
                        label="Descrição"
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{ margin: "10px 0" }}
                        value={textoDescricao}
                        onChange={(e) => setTextoDescricao(e.target.value)}
                      />
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Urgência
                      </InputLabel>
                      <Select
                        id="demo-simple-select"
                        label="Urgência"
                        size="small"
                        value={urgencia}
                        onChange={(e) => setUrgencia(e.target.value)}
                      >
                        {[1, 2, 3, 4, 5].map((item) => (
                          <MenuItem key={"urgencia" + item} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <DialogActions>
                      <Button
                        variant="contained"
                        onClick={() => trataTarefas()}
                      >
                        {tarefa ? "Editar tarefa" : "Adicionar"}{" "}
                      </Button>

                      <Button onClick={fechaAddTarefa}>Cancelar</Button>
                    </DialogActions>
                  </DialogContent>{" "}
                </Dialog>
              </Grid2>
            </Grid2>
          </>
        )}
      </Grid2>
    </ThemeProvider>
  );
};

export default TodoList;
