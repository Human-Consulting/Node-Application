import { Popover, List, ListItem, ListItemText, IconButton, Typography, Divider, ListItemSecondaryAction
} from '@mui/material';
import { Delete, PersonAdd } from '@mui/icons-material'

const ModalUsuariosChat = ({ participantes, open, anchorEl, onClose }) => {
    const id = open ? 'tarefas-popover' : undefined;

    const onAdd = () => {

    }

    const onRemove = (id) => {

    }

    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            <List sx={{ width: 300, maxHeight: 300, background: '#000', color: '#fff' }}>
        {participantes.map((participante, index) => (
          <ListItem
            key={index}
            sx={{
              borderBottom: '1px solid #22272B',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              px: 2,
              py: 1.5,
            }}
          >
            <ListItemText
              primary={
                <Typography variant="subtitle1" fontWeight="bold" color="text.paper">
                  {participante.nome}
                </Typography>
              }
            />
            <IconButton edge="end" onClick={() => onRemove(participante.id)}>
              <Delete />
            </IconButton>
          </ListItem>
        ))}

        <ListItem
          button
          onClick={onAdd}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            borderTop: '1px solid #22272B',
            color: '#90caf9',
            gap: 1,
            cursor: 'pointer'
          }}
        >
          <PersonAdd />
          <Typography fontWeight="bold">Adicionar Participante</Typography>
        </ListItem>
      </List>
        </Popover>
    );
};

export default ModalUsuariosChat;
