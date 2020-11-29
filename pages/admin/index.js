import React, {Component} from 'react';
import Head from 'next/head';
import Router from 'next/router';
import {isLogin, isAdmin} from '../../libs/utils';
import Layout, {siteName, siteTitle} from '../../components/layout';
import {Container, Row, Col, Card, Jumbotron} from 'react-bootstrap';
import API from '../../libs/axios';

class Index extends Component{
  constructor(props) {
    super(props)
    this.state = {
        JumlahBlog: '',
        loading: true
    }
}
  componentDidMount = () => {
    if (!isAdmin()) {
      return( Router.push('/login') )
    }

    API.CountBlog().then(res=>{
      setTimeout(() => this.setState({
          JumlahBlog: res.data,
          loading: false
        }), 100);
  })
  }
  render(){
        
    return(
      <Layout admin>
      <Head>
        <title>Admin - {siteTitle}</title>
      </Head>

      <Container className="my-3">

      <Jumbotron className="mb-3">
        <h2>Selamat Datang di Admin Panel</h2>
      </Jumbotron>

<Row>
  <Col>
  <Card bg="info" text="light" body>
        <h5>Jumlah Post</h5>
        <h1>{this.state.JumlahBlog}</h1>
      </Card>
  </Col>
  <Col>
  <Card bg="success" text="light" body>
        <h4>Test</h4>
      </Card>
  </Col>
  <Col>
  <Card bg="danger" text="light" body>
        <h4>Test</h4>
      </Card>
  </Col>
</Row>
      

      </Container>

      </Layout>
    );
  }
}

export default Index;