import { List } from 'react-admin';
import { PostKanban } from './PostKanban';
import { Box } from '@mui/material';

export const KanbanPage = () => {
    return (
        <List
            resource="posts"
            actions={false} // Clean view without default list actions (export etc)
            perPage={100} // Fetch enough items for the board
            pagination={false} // Disable pagination for board view
            component={Box}
            disableSyncWithLocation // Prevent URL params from conflicting with main posts list
            sx={{
                '& .RaList-content': {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    padding: 0,
                    overflow: 'visible'
                },
                mt: 1
            }}
        >
            <PostKanban />
        </List>
    );
};
