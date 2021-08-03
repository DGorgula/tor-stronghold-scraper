import './Paste.css'
import { Box, makeStyles, Paper } from '@material-ui/core'
const useStyles = makeStyles((theme) => ({
    Paper: {
        backgroundColor: '#fcbf49'
    }
}));
function Paste({ paste }) {
    const { title, content, author, date } = paste
    const classes = useStyles();
    return (

        <Paper className={`paste ${classes.Paper}`} color="secondary" >

            <Box className="paste-title paste-item">{title || "title"}</Box>
            <Box className="paste-data paste-item">

                <Box className="paste-author paste-item">{author || "author"}</Box>
                <Box className="paste-date paste-item">{date || "date"}</Box>
            </Box>
            <Box className="paste-content paste-item">{content || "content"}</Box>
        </Paper>
    )
}

export default Paste
