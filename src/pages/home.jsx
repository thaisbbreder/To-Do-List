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
    // TODO: Fazer validação para não adicionar tarefas em branco
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
    <Grid2 container spacing={4} style={{
      display: "grid",
      width: "100vw",
      height: "100vh",
      background: "linear-gradient(to bottom right, #007e80 20%, #004853 90%",
    }}>
      
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
            <Button variant="contained" color="secondary" style={{margin: '10px 0 0 0'}}
              onClick={() => addTarefa()}>Adicionar</Button>
          </Grid2>

          {tarefas.map((tarefa) => {
            return (
              <Grid2 container key={tarefa.id}
              alignItems="center" style={{
                backgroundColor: tarefa.prioridade === false ? "" : "#ffbfaa",
                textDecoration: tarefa.feito === false ? "" : "line-through",
                maxHeight:'100px',
                padding: '0 10px',
              }}
              spacing={0}
              borderRadius="5px">
                  
                  <Grid2 item sm={1}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={tarefa.feito}
                        onChange={() => mudaEstado(tarefa.id)}
                      >
                      </Checkbox>
                    }>
                  </FormControlLabel>
                  </Grid2>

                  <Grid2 item sm={6}>
                    <Typography p={'10px 0 2px'} fontWeight={'bold'}>
                    {tarefa.nome}
                  </Typography>
                  <Typography p={'2px 0 10px'}>
                    {tarefa.descricao}
                  </Typography>
                  </Grid2>

                  <Grid2 item sm={5} textAlign={'right'}>
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
                  </Grid2>
                <Divider />
              </Grid2>
            );
          })}
        </Paper>
    </Grid2>
  );
};

export default Home;