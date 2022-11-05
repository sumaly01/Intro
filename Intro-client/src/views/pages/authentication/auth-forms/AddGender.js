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
    InputAdornment,
    IconButton
} from '@mui/material';
import React, { useState } from 'react';
// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { useMutation, ApolloLink, concat, HttpLink, ApolloClient, InMemoryCache } from '@apollo/client';
// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { CREATE_GENDER } from 'gqloperations/mutations';
import { strengthColor, strengthIndicatorNumFunc } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const AddGender = () => {
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
    const { loading, error } = useMutation(CREATE_GENDER);
    if (loading) return 'Loading...';
    if (error) return <pre>{error.message}</pre>;

    return (
        <>
            <Formik
                initialValues={{
                    genderName: '',
                    slugName: '',
                    order: null,
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    genderName: Yup.string().required('Gender name is required'),
                    slugName: Yup.string().required('Slug name for gender is required'),
                    order: Yup.number().required('Order to display gender is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        const genderName = values.genderName;
                        const slugName = values.slugName;
                        const order = parseInt(values.order, 10);
                        await client
                            .mutate({
                                variables: {
                                    genderName,
                                    order,
                                    slugName
                                },

                                mutation: CREATE_GENDER
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
                            <InputLabel htmlFor="outlined-adornment-gender-name">Gender</InputLabel>

                            <OutlinedInput
                                id="outlined-adornment-gender-name"
                                type="text"
                                name="genderName"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.genderName && errors.genderName && (
                                <FormHelperText error id="standard-weight-helper-text--genderName">
                                    {errors.genderName}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <InputLabel htmlFor="outlined-adornment-slugName">Select Slug Name for Gender</InputLabel>
                        <FormControl
                            fullWidth
                            error={Boolean(touched.slugName && errors.slugName)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <Select
                                labelId="outlined-adornment-slugName"
                                id="outlined-adornment-slugName"
                                value={values.slugName}
                                label="Slug name"
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
                            <InputLabel htmlFor="outlined-adornment-order">Order for gender </InputLabel>

                            <OutlinedInput
                                id="outlined-adornment-order"
                                type="text"
                                name="order"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
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

                        <Box sx={{ mt: 2 }}>
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
                                    Add Gender
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default AddGender;
