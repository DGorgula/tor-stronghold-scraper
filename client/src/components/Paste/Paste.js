import './Paste.css'
import { Box, Container, Paper } from '@material-ui/core'


function Paste({ paste }) {
    const { title, content, author, date } = paste
    return (
        <Paper className="paste" >

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
