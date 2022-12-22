import {
  Paper,
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
  Toolbar,
} from "@mui/material";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import Grid2 from "@mui/material/Unstable_Grid2";
import { signOut } from "firebase/auth";
import { auth, db } from "../services/databaseService";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import LogoutIcon from "@mui/icons-material/Logout";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const TodoList = () => {
  const navigate = useNavigate();
  const [tarefas, setTarefas] = useState([]); //referente a lista
  const [textoTarefa, setTextoTarefa] = useState(""); // referente ao valor inserido no Nova Tarefa
  const [textoDescricao, setTextoDescricao] = useState(""); //referente ao valor inserido no Descrição
  const [urgencia, setUrgencia] = useState(1); // referente ao campo Urgencia
  const [darkMode, setDarkMode] = useState(false);

  //dark mode
  const mudaTema = () => {
    setDarkMode(!darkMode);
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

  const addTarefa = () => {
    const novoArray = [...tarefas];
    const novaTarefa = {
      id: tarefas.length + 1,
      nome: textoTarefa,
      descricao: textoDescricao,
      feito: false,
      urgencia: urgencia,
      edita: false,
      userId: auth.currentUser.uid,
    };

    try {
      const docRef = addDoc(collection(db, "todolist"), novaTarefa);
      console.log("Document written with ID: ", docRef.id);
      setTarefas();
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    setTextoTarefa("");
    setTextoDescricao("");

    if (!textoTarefa) {
      return alert("Não é possível adicionar tarefas em branco");
    }

    //nível de urgência
    novoArray.push(novaTarefa);
    novoArray.sort((a, b) => b.urgencia - a.urgencia);
    setTarefas(novoArray);
  };

  //lê as tarefas do firestore
  useEffect(() => {
    const fetchData = async () => {
      const novaTarefa = [];
      const querySnapshot = await getDocs(collection(db, "todolist"));
      querySnapshot.forEach((doc) => {
        novaTarefa.push({ ...doc.data(), id: doc.id });
      });
      setTarefas(novaTarefa);
    };
    fetchData();
  }, []);

  //envia o nome/descriçao da tarefa para o formulario
  const editaFormulario = (id) => {
    const editaTarefa = tarefas.find((tarefa) => tarefa.id === id);
    setTextoTarefa(editaTarefa.nome);
    setTextoDescricao(editaTarefa.descricao);
  };

  //substitui na todolist
  const editaTarefa = (id) => {
    const editaNome = tarefas.map((tarefa) => {
      if (tarefa.id === id) {
        tarefa.nome = textoTarefa;
        tarefa.descricao = textoDescricao;
        tarefa.urgencia = urgencia;
      }
      return tarefa;
    });
    setTarefas(editaNome);
    setTextoTarefa("");
    setTextoDescricao("");
  };

  //salva no firebase
  const atualizaTarefa = async (id) => {
    const tarefaRef = doc(db, "todolist", id);
    await updateDoc(tarefaRef, {
      nome: textoTarefa,
      descricao: textoDescricao,
      urgencia: urgencia,
    });
  };

  //check
  const mudaEstado = (id) => {
    setTarefas((estadoAtual) => {
      const novoEstado = [...estadoAtual];
      novoEstado.filter((tarefa) => {
        if (tarefa.id === id) {
          tarefa.feito = !tarefa.feito;
        } else {
          return tarefa;
        }
      });
      return novoEstado;
    });
  };

  const mudaUrgencia = (id, urgencia) => {
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

  //rota
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      }
    });
  }, []);

  return (
    <Grid2
      spacing={0}
      style={{
        display: "grid-inline",
        height: "100vh",
        width: "100vw",
        overflow: "auto",
        background: darkMode ? "#040404" : "#EAF3DB",
      }}
    >
      {auth.currentUser && (
        <Grid2 item sm={12}>
          <Box
            style={{
              height: "20vh",
              backgroundColor: darkMode ? "#131522" : "#A7C654",
            }}
          >
            <Toolbar>
              <IconButton
                aria-label="Dark Mode"
                style={{ marginLeft: "95%" }}
                onClick={() => mudaTema()}
              >
                <Brightness4Icon color="success" />
              </IconButton>
              <IconButton
                aria-label="Logout"
                onClick={() =>
                  signOut(auth).then(() => {
                    console.log("deslogado");
                  })
                }
              >
                <LogoutIcon color="success" />
              </IconButton>
            </Toolbar>
            <Avatar
              sx={{ width: 100, height: 100 }}
              src={auth.currentUser?.photoURL}
              style={{ margin: "auto" }}
            />
          </Box>
        </Grid2>
      )}

      {auth.currentUser && (
        <Grid2 item sm={12}>
          <Paper
            style={{
              margin: "auto",
              width: "50%",
              padding: "50px",
              background: darkMode ? "#393939" : "#F2F2F2",
            }}
          >
            <Grid2 xs={12} textAlign="center">
              <Typography
                fontSize={50}
                fontWeight={"bold"}
                textAlign={"center"}
                style={{
                  fontFamily: "Fjalla One",
                  color: darkMode ? "#EAF3DB" : "#393939",
                }}
              >
                {"To-do List de " + auth.currentUser?.displayName}
              </Typography>
              <Accordion
                style={{
                  margin: "2% 20%",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  style={{ background: darkMode ? "#131522" : "#F2F2F2" }}
                >
                  <AddCircleIcon
                    color="success"
                    style={{ padding: "0px 10px" }}
                  />
                  <Typography
                    style={{
                      fontFamily: "Fjalla One",
                      fontWeight: "bold",
                      color: darkMode ? "#EAF3DB" : "#373933",
                    }}
                  >
                    Adicionar nova tarefa
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  style={{ background: darkMode ? "#A6A5A5" : "#F2F2F2" }}
                >
                  <FormControl fullWidth style={{ color: "#0093E9" }}>
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
                      style={{ margin: "10px 0 10px 0" }}
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
                        <MenuItem key={"urgencia-" + item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button
                    variant="contained"
                    color="success"
                    style={{ margin: "10px 0 0 0", fontFamily: "Fjalla One" }}
                    onClick={() => addTarefa()}
                  >
                    Adicionar
                  </Button>
                </AccordionDetails>
              </Accordion>
            </Grid2>

            {tarefas.map((tarefa) => {
              return (
                <Grid2
                  container
                  key={tarefa.id}
                  alignItems="center"
                  style={{
                    backgroundColor: cores[tarefa.urgencia],
                    textDecoration:
                      tarefa.feito === false ? "" : "line-through",
                    maxHeight: "100px",
                    padding: "0 10px",
                    margin: "10px 10px 0 0",
                  }}
                  borderRadius="5px"
                >
                  <Grid2 item sm={1}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={tarefa.feito}
                          onChange={() => mudaEstado(tarefa.id)}
                        ></Checkbox>
                      }
                    ></FormControlLabel>
                  </Grid2>

                  <Grid2 item sm={6}>
                    <Typography p={"10px 0 2px"} fontWeight={"bold"}>
                      {tarefa.nome}
                    </Typography>
                    <Typography p={"2px 0 10px"}>{tarefa.descricao}</Typography>
                  </Grid2>

                  <Grid2 item sm={5} textAlign={"right"}>
                    <FormControl>
                      <Select
                        style={{ borderRadius: "100px" }}
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
                    <Button
                      variant="contained"
                      //color="secondary"
                      style={{ margin: "10px 0 0 0" }}
                      onClick={() => editaTarefa(tarefa.id)}
                    >
                      Substituir
                    </Button>

                    <Button
                      variant="contained"
                      //color="secondary"
                      style={{ margin: "10px 0 0 0" }}
                      onClick={() => atualizaTarefa()}
                    >
                      Salvar
                    </Button>

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
          </Paper>
        </Grid2>
      )}
    </Grid2>
  );
};

export default TodoList;
