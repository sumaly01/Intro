// material-ui

/* eslint no-underscore-dangle: 0 */
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    InputLabel,
    OutlinedInput,
    Select,
    MenuItem,
    Grid,
    InputAdornment,
    IconButton
} from '@mui/material';
import React, { useState } from 'react';
// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { concat, ApolloLink, useMutation, HttpLink, ApolloClient, InMemoryCache } from '@apollo/client';
// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { CREATE_USER, UPDATE_USER, UPDATE_GENDER } from 'gqloperations/mutations';
import { strengthColor, strengthIndicatorNumFunc } from 'utils/password-strength';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const EditGender = ({ edit, editData, handleCloseModal }) => {
    console.log('editData=>', editData);
    const httpLink = new HttpLink({ uri: 'http://localhost:3000/graphql' });

    const authMiddleware = new ApolloLink((operation, forward) => {
        // add the authorization to the headers
        operation.setContext(({ headers = {} }) => ({
            headers: {
                ...headers,
                authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}` || null
            }
        }));

        return forward(operation);
    });

    const client = new ApolloClient({
        link: concat(authMiddleware, httpLink),
        cache: new InMemoryCache()
    });

    const [showPassword, setShowPassword] = React.useState(false);
    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicatorNumFunc(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const { loading, error } = useMutation(UPDATE_GENDER);
    // tokens
    if (loading) return 'Loading...';
    if (error) return <pre>{error.message}</pre>;

    return (
        <>
            <Formik
                initialValues={{
                    genderName: editData?.findGenderById.genderName,
                    slugName: editData?.findGenderById.slugName,
                    order: editData?.findGenderById.order,
                    submit: null
                }}
                // initialValues={{
                //     genderName: '',
                //     slugName: null,
                //     order: null,
                //     submit: null
                // }}
                validationSchema={Yup.object().shape({
                    genderName: Yup.string().required('Gender is required'),
                    slugName: Yup.string().required('Slug name for gender is required'),
                    order: Yup.number().required('Order to arrange gender is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        const _id = editData.findGenderById._id;
                        const value = { ...values, _id };
                        const genderName = value.genderName;
                        const slugName = value.slugName;
                        const order = parseInt(value.order, 10);

                        console.log('selected ID=>', editData);

                        await client
                            .mutate({
                                variables: {
                                    _id,
                                    genderName,
                                    slugName,
                                    order
                                },
                                mutation: UPDATE_GENDER
                            })
                            .then(
                                () => {
                                    window.location.href = '/genders/genders-list';
                                },
                                (err) => {
                                    if (scriptedRef.current) {
                                        setStatus({ success: false });
                                        setErrors({ submit: err.message });
                                        setSubmitting(false);
                                    }
                                }
                            );
                    } catch (err) {
                        console.error(err);
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <FormControl
                            fullWidth
                            error={Boolean(touched.genderName && errors.genderName)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-genderName">Gender</InputLabel>

                            <OutlinedInput
                                id="outlined-adornment-genderName"
                                type="text"
                                name="genderName"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                                value={values.genderName}
                            />
                            {touched.genderName && errors.genderName && (
                                <FormHelperText error id="standard-weight-helper-text--genderName">
                                    {errors.genderName}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <InputLabel htmlFor="outlined-adornment-slugName">Select Slug Name</InputLabel>
                        <FormControl
                            fullWidth
                            error={Boolean(touched.slugName && errors.slugName)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <Select
                                labelId="outlined-adornment-slugName"
                                id="outlined-adornment-slugName"
                                value={values.slugName}
                                label="User Type"
                                onChange={(event) => {
                                    const {
                                        target: { value }
                                    } = event;
                                    setFieldValue('slugName', value);
                                }}
                            >
                                <MenuItem value="WOMEN">WOMEN</MenuItem>
                                <MenuItem value="MEN">MEN</MenuItem>
                                <MenuItem value="TRANS">TRANS</MenuItem>
                                <MenuItem value="BISEXUAL">BISEXUAL</MenuItem>
                                <MenuItem value="LESBIAN">LESBIAN</MenuItem>
                                <MenuItem value="GAY">GAY</MenuItem>
                            </Select>

                            {touched.slugName && errors.slugName && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.slugName}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl fullWidth error={Boolean(touched.order && errors.order)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-order">Order</InputLabel>

                            <OutlinedInput
                                id="outlined-adornment-order"
                                type="text"
                                name="order"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                                value={values.order}
                            />
                            {touched.order && errors.order && (
                                <FormHelperText error id="standard-weight-helper-text--order">
                                    {errors.order}
                                </FormHelperText>
                            )}
                        </FormControl>

                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ width: '100%' }}>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid item xs={6}>
                                    <Button
                                        disableElevation
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="secondary"
                                    >
                                        Edit Gender
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button fullWidth size="large" variant="contained" color="primary" onClick={handleCloseModal}>
                                        Close
                                    </Button>
                                </Grid>
                                {/* <Grid item xs={6}>
                                    <Item>3</Item>
                                </Grid>
                                <Grid item xs={6}>
                                    <Item>4</Item>
                                </Grid> */}
                            </Grid>
                        </Box>

                        {/* <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    Edit User
                                </Button>
                                <Button fullWidth size="large" variant="contained" color="primary" onClick={handleCloseModal}>
                                    Close
                                </Button>
                            </AnimateButton>
                        </Box> */}
                    </form>
                )}
            </Formik>
        </>
    );
};

EditGender.propTypes = {
    edit: PropTypes.bool,
    editData: PropTypes.object,
    handleCloseModal: PropTypes.func
};

export default EditGender;
