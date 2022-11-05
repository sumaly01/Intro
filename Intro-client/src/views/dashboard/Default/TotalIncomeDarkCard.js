import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { useQuery } from '@apollo/client';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';
import { USERS_LIST } from 'gqloperations/queries';

// assets
import GroupIcon from '@mui/icons-material/Group';
// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(210.04deg, ${theme.palette.primary[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
        borderRadius: '50%',
        top: -30,
        right: -180
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(140.9deg, ${theme.palette.primary[200]} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
        borderRadius: '50%',
        top: -160,
        right: -130
    }
}));

// ==============================|| DASHBOARD - TOTAL INCOME DARK CARD ||============================== //

const TotalIncomeDarkCard = ({ isLoading }) => {
    const theme = useTheme();
    const [rows, setRows] = useState();
    const { data, loading, error } = useQuery(USERS_LIST, {
        context: { headers: { authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}` } }
    });

    useEffect(() => {
        console.log('dashboard=>', data);
        const userList = data?.listUser.map((items) => items);
        setRows(userList);
        console.log({ rows });
    }, [data]);

    if (loading) return 'Loading...';
    if (error) return <pre>{error.message}</pre>;

    return (
        <>
            {isLoading ? (
                <TotalIncomeCard />
            ) : (
                rows && (
                    <CardWrapper border={false} content={false}>
                        <Box sx={{ p: 2 }}>
                            <List sx={{ py: 0 }}>
                                <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                                    <ListItemAvatar>
                                        <Avatar
                                            variant="rounded"
                                            sx={{
                                                ...theme.typography.commonAvatar,
                                                ...theme.typography.largeAvatar,
                                                backgroundColor:
                                                    theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.warning.light,
                                                color:
                                                    theme.palette.mode === 'dark' ? theme.palette.warning.dark : theme.palette.warning.dark
                                            }}
                                        >
                                            <GroupIcon fontSize="inherit" />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        sx={{
                                            py: 0,
                                            mt: 0.45,
                                            mb: 0.45
                                        }}
                                        primary={<Typography variant="h4">{rows.length}</Typography>}
                                        secondary={
                                            <Typography variant="subtitle2" sx={{ color: theme.palette.grey[500], mt: 0.5 }}>
                                                Total Intro Users
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                            </List>
                        </Box>
                    </CardWrapper>
                )
            )}
        </>
    );
};

TotalIncomeDarkCard.propTypes = {
    isLoading: PropTypes.bool
};

export default TotalIncomeDarkCard;
