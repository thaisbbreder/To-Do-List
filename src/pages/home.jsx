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
  Badge,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";

const Home = () => {
  // Estados: usados para alterar as variáveis. Retorna um valor e uma função para alterar esse valor
  const [tarefas, setTarefas] = useState([]); //referente a lista
  const [textoTarefa, setTextoTarefa] = useState(""); // referente ao valor inserido no Nova Tarefa
  const [textoDescricao, setTextoDescricao] = useState(""); //referente ao valor inserido no Descrição
  const [urgencia, setUrgencia] = useState(1); // referente ao campo Urgencia

  const cores = {
    1: "#F3E6BC",
    2: "#F1C972",
    3: "#F5886B",
    4: "#72AE95",
    5: "#71CBC4",
  };

  const addTarefa = () => {
    // TODO: Fazer validação para não adicionar tarefas em branco
    const novoArray = [...tarefas];
    const novaTarefa = {
      id: tarefas.length + 1,
      nome: textoTarefa,
      descricao: textoDescricao,
      feito: false, //false: não feito  true: feito
      urgencia: urgencia,
    };
   
      if(!textoTarefa){
        return alert('A tarefa precisa de um nome para ser adicionada')
        }
    

    novoArray.push(novaTarefa);
    // TODO: Estudar função de sorting!!!
    novoArray.sort((a, b) => b.urgencia - a.urgencia);
    setTarefas(novoArray);
  };

  const deletaTarefa = (id) => {
    const novaLista = tarefas.filter((tarefa) => {
      return tarefa.id !== id;
    });
    setTarefas(novaLista);
  };

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

  return (
    <Grid2
      container
      spacing={4}
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
          <Typography
            fontSize={34}
            fontWeight={"bold"}
            color={"#007E80"}
            textAlign={"center"}
          >
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
            onChange={(e) => setTextoTarefa(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Descrição"
            variant="outlined"
            size="small"
            margin="dense"
            fullWidth
            value={textoDescricao}
            onChange={(e) => setTextoDescricao(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Urgência</InputLabel>
            <Select
              labelId="demo-simple-select-label"
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
            color="secondary"
            style={{ margin: "10px 0 0 0" }}
            onClick={() => addTarefa()}
          >
            Adicionar
          </Button>
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
                  aria-label="delete"
                  style={{
                    color: "#007e80",
                  }}
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
  );
};

export default Home;
