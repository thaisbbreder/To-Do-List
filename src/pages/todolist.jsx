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
  AppBar,
  Box,
  Toolbar,
} from "@mui/material";
import { useEffect, useId, useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Grid2 from "@mui/material/Unstable_Grid2";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, db, provider } from "../services/databaseService";
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
  const [escuro, setEscuro] = useState(false);

  //dark mode
  const mudaTema = () => {
    setEscuro(!escuro);
  };

  const cores = {
    1: "#8DBEDA",
    2: "#67A8CD",
    3: "#4292BF",
    4: "#357599",
    5: "#295872",
  };

  const addTarefa = () => {
    const novoArray = [...tarefas];
    const novaTarefa = {
      id: tarefas.length + 1,
      nome: textoTarefa,
      descricao: textoDescricao,
      feito: false, //false: não feito  true: feito
      urgencia: urgencia,
      edita: false,
    };
    setTextoTarefa("");
    setTextoDescricao("");

    //validação para não adicionar tarefa em branco
    if (!textoTarefa) {
      return alert("Não é possível adicionar tarefas em branco");
    }

    //nível de urgência
    novoArray.push(novaTarefa);
    novoArray.sort((a, b) => b.urgencia - a.urgencia);
    setTarefas(novoArray);

    //não adiciona a primeira tarefa
    try {
      tarefas.forEach(async (tarefa) => {
        const docRef = await addDoc(collection(db, "todolist"), tarefa);
        console.log("Document written with ID: ", docRef.id);
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  //lê as tarefas salvas do firestore e envia para o to-do list
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
  const editaFormulario = (collectionId) => {
    const editaTarefa = tarefas.find((tarefa) => tarefa.id === collectionId);
    setTextoTarefa(editaTarefa.nome);
    setTextoDescricao(editaTarefa.descricao);
  };

  //salva no firebase
  const atualizaTarefa = async (collectionId) => {
    const tarefaRef = doc(db, "todolist", collectionId);
    await updateDoc(tarefaRef, {
      nome: textoTarefa,
      descricao: textoDescricao,
      urgencia: urgencia,
    });
  };

  //substitui na todolist
  const editaTarefa = (collectionId) => {
    const editaNome = tarefas.map((tarefa) => {
      if (tarefa.id === collectionId) {
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

  const deletaTarefa = async (collectionId) => {
    const tarefaRef = doc(db, "todolist", collectionId);
    await deleteDoc(tarefaRef);
    const listaAtualizada = tarefas.filter(
      (tarefa) => tarefa.id !== collectionId
    );
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
      container
      spacing={4}
      style={{
        display: "grid",
        width: "100vw",
        height: "100vh",
        background: escuro
          ? "radial-gradient(circle at -4.17% 4.55%, #303547 0, #00112c 50%, #000015 100%)"
          : "linear-gradient(to right, #c4ccd6, #bfc6cf, #bac1c9, #b5bbc2, #b0b6bc)",
      }}
    >
      {auth.currentUser && (
        <Box>
          <AppBar position="static" sx={{ backgroundColor: "action.active" }}>
            <Toolbar>
              <Avatar
                src={auth.currentUser?.photoURL}
                referrerPolicy="no-referrer"
                size="small"
                style={{ margin: "25px 10px 5px 0" }}
              />
              <Typography
                sx={{ flexGrow: 1 }}
                fontWeight={"bold"}
                style={{ margin: "20px 0 5px 0" }}
              >
                {" "}
                {"Seja bem vindo, " + auth.currentUser?.displayName + "!"}
              </Typography>

              <IconButton
                aria-label="Logout"
                style={{ margin: "20px 10px 5px 0" }}
                onClick={() => mudaTema()}
              >
                <Brightness4Icon color="primary" />
              </IconButton>

              <IconButton
                aria-label="Logout"
                style={{ margin: "20px 10px 5px 0" }}
                onClick={() =>
                  signOut(auth).then(() => {
                    console.log("deslogado");
                  })
                }
              >
                <LogoutIcon color="primary" />
              </IconButton>
            </Toolbar>
          </AppBar>
        </Box>
      )}

      {auth.currentUser && (
        <Paper
          style={{
            margin: "auto",
            width: "40%",
            maxHeight: "80%",
            padding: "30px",
            overflow: "auto",
            background: escuro ? "#DCDCDC" : "#F2F2F2",
          }}
        >
          <Grid2 xs={12}>
            <Typography
              fontSize={50}
              fontWeight={"bold"}
              textAlign={"center"}
              style={{
                fontFamily: "Fjalla One",
                color: escuro ? "#064C72" : "#0093E9",
              }}
            >
              {" "}
              {"To-do list de " + auth.currentUser?.displayName}
            </Typography>
          </Grid2>

          <Grid2 xs={12} textAlign="center">
            <Accordion style={{ background: escuro ? "#DCDCDC" : "#F2F2F2" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                style={{ background: escuro ? "#DCDCDC" : "#F2F2F2" }}
              >
                <Typography
                  style={{
                    fontFamily: "Fjalla One",
                    fontWeight: "bold",
                    color: escuro ? "#064C72" : "#0093E9",
                  }}
                >
                  Adicionar nova tarefa
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                style={{ background: escuro ? "#DCDCDC" : "#F2F2F2" }}
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
                  style={{ margin: "10px 0 0 0" }}
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
                  textDecoration: tarefa.feito === false ? "" : "line-through",
                  maxHeight: "100px",
                  padding: "0 10px",
                  margin: "10px 10px 0 0",
                }}
                spacing={0}
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
                      onChange={(e) => mudaUrgencia(tarefa.id, e.target.value)}
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
                    onClick={() => atualizaTarefa(tarefa.nome)}
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
      )}
    </Grid2>
  );
};

export default TodoList;
