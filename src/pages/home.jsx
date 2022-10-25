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
import Grid2 from '@mui/material/Unstable_Grid2';
import { useEffect, useState } from "react";

const Home = () => {
  // Estados
  const [tarefas, setTarefas] = useState([]);
  const [textoTarefa, setTextoTarefa] = useState("")
  const [textoDescricao, setTextoDescricao] = useState("")

  const addTarefa = () => {
    const novoArray = [...tarefas];
    const novaTarefa = {
      id: tarefas.length + 1,
      nome: textoTarefa,
      descricao: textoDescricao,
      prioridade: false, //false: normal  true: urgente
      feito: false, //false: não feito  true: feito
    }
    novoArray.push(novaTarefa);
    setTarefas(novoArray)
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
          return tarefa;
        } else {
          return tarefa;
        }
      });
      return novaPrioridade;
    })
  }

  return (
    <Grid2 container spacing={4}>
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
            margin: "auto",
            width: "40%",
            maxHeight: "60%",
            padding: "40px",
            overflow: "auto",
          }}
        >
          <Grid2 xs={12}>
            <Typography fontSize={34} fontWeight={"bold"} color={"#007E80"} textAlign={"center"}>
              To-do List
            </Typography>
          </Grid2>

          <Grid2 xs={12} textAlign="center">
            <TextField
              id="outlined-basic"
              label="Nova tarefa"
              variant="outlined"
              size="small"
              fullWidth
              value={textoTarefa}
              onChange={e => setTextoTarefa(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Descrição"
              variant="outlined"
              size="small"
              margin="dense"
              fullWidth
              value={textoDescricao}
              onChange={e => setTextoDescricao(e.target.value)}
            />
            <Button variant="contained" color="secondary"
              onClick={() => addTarefa()}>Adicionar</Button>
          </Grid2>

          {tarefas.map((tarefa) => {
            return (
              <div key={tarefa.id}>
                <Grid2 xs={12}
                  display="flex"
                  justifyContent="space-between"
                  flexWrap="wrap"
                  alignItems="center"
                  borderRadius="5px"
                  style={{
                    backgroundColor: tarefa.prioridade === false ? "" : "#ffbfaa",
                    textDecoration: tarefa.feito === false ? "" : "line-through",
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

                  <Typography>
                    <p>{tarefa.descricao}</p>
                  </Typography>

                  <div style={{ alignItems: "flex-end" }}>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      style={{
                        background: "#F4796B",
                        color: "#222016"
                      }}
                      onClick={() => mudaPrioridade(tarefa.id)}> Urgente
                    </Button>
                    <IconButton aria-label="delete"
                      style={{
                        color: "#007e80",
                      }}
                      onClick={() => deletaTarefa(tarefa.id)}>
                      <DeleteIcon />
                    </ IconButton>
                  </div>
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