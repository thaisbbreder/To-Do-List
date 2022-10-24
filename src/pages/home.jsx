import {
  Paper,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Divider,
} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import MapIcon from '@mui/icons-material/Map';
import Grid2 from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect, useState } from "react";

const Home = () => {
  const [tarefas, setTarefas] = useState([]);
  const [textoTarefa, setTextoTarefa] = useState("")

  const addTarefa = () => {
    const novoArray = [...tarefas];
    const novaTarefa = {
      id: tarefas.length + 1,
      nome: textoTarefa,
      descricao: textoDescricao,
      prioridade: false, //false: normal  true: urgente
      feito: false, //false: não feito true: feito
    }
    novoArray.push(novaTarefa);
    setTarefas(novoArray)
  }
  const [textoDescricao, setTextoDescricao] = useState("") //variavel para armazenar o valor do input
  const addDescricao = () => {
    const itemDescricao = [...tarefas.descricao];
    const novaDescricao = {
      id: tarefas.length + 1,
      nome: textoTarefa,
      descricao: textoDescricao,
      feito: false,
    }
    itemDescricao.push(novaDescricao);
    setTarefas(itemDescricao)
  }
  const deletaTarefa = (id) => {
    const novaLista = tarefas.filter((tarefa) => {
      return tarefa.id !== id
    })
    setTarefas(novaLista)
  }
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
    })
  };
  //clicar no botão para a prioridade ser alterada
  const mudaPrioridade = (id) => {
    setTarefas((prioridadeAtual) => {
      const novaPrioridade = [...prioridadeAtual];
      novaPrioridade.filter((tarefa) => {
        if (tarefa.id === id) {
          tarefa.prioridade = !tarefa.prioridade;
          tarefas.sort()
          return tarefa;
        } else {
          return tarefa;
        }
      });
      return novaPrioridade;
    })
  }

  return (
    <Grid2 container spacing={2}>
      <div
        style={{
          display: "grid",
          width: "100vw",
          height: "100vh",
          background: "linear-gradient(to bottom right, #007e80 20%, #004853 90%",
        }}
      >
        <Paper
          style={{
            display: "grid",
            margin: "auto",
            width: "40%",
            maxHeight: "60%",
            padding: "40px",
            overflow: "auto",
            textAlign: "center",
            color: "#007e80"
          }}
        >
          <Grid2 xs={12}>
            <Typography fontSize={34} fontWeight={"bold"} textAlign={"center"} >
              To-do List
            </Typography>
          </Grid2>

          <Grid2 xs={12}>
            <TextField
              id="outlined-basic"
              label="Nova tarefa"
              variant="outlined"
              size="small"
              margin="dense"
              fullWidth
              value={textoTarefa}
              onChange={e => setTextoTarefa(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Descrição"
              variant="outlined"
              size="small"
              margin="normal"
              fullWidth
              value={textoDescricao}
              onChange={e => setTextoDescricao(e.target.value)}
            />
            <Button variant="contained" color="secondary" margin="dense"
              onClick={() => addTarefa()}>
              Adicionar
            </Button>
          </Grid2>

          {tarefas.map((tarefa) => {
            return (
              <div key={tarefa.id}>
                <Grid2 xs={12}
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                  borderRadius="5px"
                  style={{
                    backgroundColor: tarefa.prioridade === false ? "" : "#ffbfaa",
                  }}
                >
                  <FormControlLabel
                    label={tarefa.nome}
                    control={
                      <Checkbox
                        checked={tarefa.feito}
                        onChange={() => mudaEstado(tarefa.id)}
                      >
                      </Checkbox>
                    }>
                  </FormControlLabel>

                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      color: "#007e80"
                    }}
                    onClick={() => mudaPrioridade(tarefa.id)}> urgente
                  </Button>

                  <IconButton aria-label="delete"
                    style={{
                      textAlign: "left",
                      color: "#007e80",
                      position: "relative",
                      textAlign: "left"
                    }}
                    onClick={() => deletaTarefa(tarefa.id)}>
                    <DeleteIcon />
                  </ IconButton>

                  <Typography textAlign={"left"}>
                    {tarefa.descricao}
                  </Typography>
                </Grid2>
                <Divider />

              </div>
            );
          })}
        </Paper>
      </div>
    </Grid2>
  );
};

export default Home;