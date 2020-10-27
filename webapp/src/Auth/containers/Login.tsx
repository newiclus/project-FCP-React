import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import useForm from "react-hook-form"
import { 
  Button, 
  Form, 
  Grid, 
  Header,
  Segment,
  Message,
  InputOnChangeData
} from 'semantic-ui-react'

import AuthService from '../service/AuthService'
import { UserLoginAction } from '../actions/authActions'
import ProgressWithMessage from '../../common/ProgressWithMessage/ProgressWithMessage'
import MainLayout from '../../common/layout/MainLayout'


interface  IAuth {
  error: any
  pending: boolean
  user: object
}

const Login = () => {
  const {
    register,
    errors,
    handleSubmit,
    setValue,
    triggerValidation
  } = useForm();

  const [loggedIn, setLoggedIn] = useState( AuthService.isLoggedIn()  )
  const [isDisabled, setIsDisabled] = useState(false)

  const auth:IAuth = useSelector((state:any) => state.auth)
  const dispatchLogin = useDispatch()

  useEffect(() => {
    if ( AuthService.isLoggedIn() ) {
      setLoggedIn(true)
    }

    setIsDisabled(auth.pending)

  }, [loggedIn, isDisabled, auth])

  useEffect(() => {
    register(
      { name: "email" },
      { pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i },
    )
    register({ name: "password" }, { required: true })
  }, [])

  const handleChangeEmail = async(event:any, { name, value }: InputOnChangeData) => {
    setValue(name, value)
    await triggerValidation({ name })
  }

  const handleChangePass = async(event:any, { name, value }: InputOnChangeData) => {
    setValue(name, value)
    await triggerValidation({ name })
  }

  const handleLoginUser = (data:any, e:any) => {
    const {email, password} = data
    dispatchLogin(UserLoginAction(email, password))
  }
  

  return (
    loggedIn ? (
      <Redirect to="/"/>
    ) : (
      <MainLayout noMenu>
        <Grid textAlign="center">
          { auth.pending && <ProgressWithMessage message="Validando datos para el Login" /> }
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' className="title">
              Login
            </Header>
            <Form error={auth.error ? true : false} size='large' onSubmit={handleSubmit(handleLoginUser)}>
              <Segment>
                {auth.error && (
                  <Form.Field>
                    <Message
                      style={{top: '0px'}}
                      error
                      content={auth.error.message}
                    />
                  </Form.Field>
                )}
                <Form.Input 
                  fluid 
                  icon='user' 
                  iconPosition='left' 
                  placeholder='E-mail' 
                  type='email'
                  onChange={handleChangeEmail}
                  name='email'
                  error={errors.email ? {content: 'Ingrese un email valido', pointing: 'above'} : false}
                />

                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  onChange={handleChangePass}
                  name='password'
                  error={errors.password ? {content: 'Ingrese un password valido', pointing: 'above'} : false}
                />

                <Button 
                  color='teal' 
                  disabled={isDisabled}
                  fluid size='large' 
                  type="submit">
                  Acceder
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
          
        </Grid>
      </MainLayout>
    )
  )
}

export default Login