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
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useEffect, useState } from "react";

const Home = () => {
  const [tarefas, setTarefas] = useState([]);
  const [textoTarefa, setTextoTarefa] = useState("") 
  const [prioridade, setPrioridade] = useState('');

  const addTarefa = () => {
    const novoArray = [...tarefas];
    const novaTarefa = {
      id: tarefas.length + 1,
      nome: textoTarefa,
      descricao: textoDescricao,
      prioridade: false,
      feito: false,
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
      prioridade: false,
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

  //quando eu clico no checkbox, o estado atual da tarefa é alterado para um novo estado (feito: true/false) 
  //e o código é refatorado/refeito cada vez que o estado é alterado, 
  //fazendo com que seja possivel marcar o checkbox de cada uma das tarefas e não perder o que foi feito no estado anterior
  const mudaEstado = (id) => {
    setTarefas((estadoAtual) => {
      const novoEstado = [...estadoAtual];
      //spread operator: está fazendo uma cópia do estado atual 
      //ao clicar em algum checkbox, o filter vai percorrer o array até identificar o id referente a essa tarefa e retornar um valor baseado na condição
      novoEstado.filter((tarefa) => {
        if (tarefa.id === id) {
          tarefa.feito = !tarefa.feito;   //se o "feito" estiver recebendo false, agora ele irá receber o contrário (true)
          return tarefa;
        } else {
          return tarefa;
        }
      });
      return novoEstado;
    });
  };

   const mudaPrioridade = (id) => { 
       }

  return (
    <Grid2 container spacing={1}>
      <div
        style={{
          display: "grid",
          width: "100vw",
          height: "100vh",
          backgroundColor: "#3b3b3b",
        }}
      >
        <Paper elevation={3}
          style={{
            display: "grid",
            margin: "auto",
            width: "30%",
            maxHeight: "60%",
            padding: "40px",
            overflow: "auto"
          }}
        >
          <Grid2 xs={12}>
            <Typography fontSize={24} fontWeight={"bold"} textAlign={"center"} >
              To-do List
            </Typography>
          </Grid2>

          <Grid2 xs={12} textAlign={"center"}>
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

            <Button variant="contained" 
              onClick={() => addTarefa()}>
              Adicionar
            </Button>
          </Grid2>

          {tarefas.map((tarefa) => {
            return (
              <div key={tarefa.id}>
                <Grid2 xs={12} display="flex" 
                flexDirection="row" 
                justifyContent="space-between" 
                alignItems="center" style={{backgroundColor: tarefa.prioridade ? "#e1d772" : "#f06b50" }}>

                  <FormControlLabel
                    label={tarefa.nome}
                    control={
                      <Checkbox 
                        checked={tarefa.feito}
                        onChange={() => mudaEstado(tarefa.id)}>
                      </Checkbox>
                    }>
                  </FormControlLabel>
                                            
                    <Typography>
                      {tarefa.descricao}
                    </Typography>

                    <Box sx={{ minWidth: 120 }}>
                  <FormControl variant="standard" size="small">
                    <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={prioridade}
                      label="Priority"
                      onChange={e => setPrioridade(e.target.value)} 
                    >
                      <MenuItem value={10}>Normal</MenuItem>
                      <MenuItem value={20}>Low</MenuItem>
                      <MenuItem value={30}>High</MenuItem>
                    </Select>
                  </FormControl>
                  </Box>

                    <IconButton aria-label="delete"
                    onClick={() => deletaTarefa(tarefa.id)}>
                    <DeleteIcon />
                  </ IconButton>              

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