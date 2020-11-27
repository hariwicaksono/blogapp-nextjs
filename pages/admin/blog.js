import React, { Component, useState, useMemo } from 'react'
import Head from 'next/head';
import Router from 'next/router';
import Link from 'next/link';
import {isLogin, isAdmin} from '../../libs/utils';
import {ImagesUrl} from '../../libs/urls';
import Layout, {siteName, siteTitle} from '../../components/layout';
import API from '../../libs/axios';
import {toast} from 'react-toastify';
import {Container, Breadcrumb, Card, Row, Col, Button, Form} from 'react-bootstrap';
import { FaTrash, FaPencilAlt} from 'react-icons/fa';
import { Formik } from 'formik';
//import * as yup from 'yup';
import Loader from 'react-loader';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import Dialog from 'react-bootstrap-dialog';

var options = {lines: 13,length: 20,width: 10,radius: 30,scale: 0.35,corners: 1,color: '#fff',opacity: 0.25,rotate: 0,direction: 1,speed: 1,trail: 60,fps: 20,zIndex: 2e9,top: '50%',left: '50%',shadow: false,hwaccel: false,position: 'absolute'};
class Blog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Blog: [],
            Category: [],
            url: ImagesUrl(),
            loading: true 
        }

    }

    componentDidMount = () => {
        API.GetBlog().then(res => {
          if (res.data.length > 0) {
            setTimeout(() => this.setState({
                Blog: res.data,
                loading: false
            }), 100);
          } else {
            this.setState({
                error: "No Data Found",
                loading: false
            })
        }
        }).catch(err => {
          console.log(err.response)
      })
      API.GetCategory().then(res => {
        this.setState({
            Category: res.data,
            loading: false
        })
    })

    }  
    
    render() {
      const columns = [
        {
          name: 'ID',
          selector: 'id',
          sortable: true
        },
        ,
        {
          name: '',
          sortable: true,
          cell: row => <>
          <img src={this.state.url+row.post_image} width="60" alt=""/>
          </>,
        },
        {
          name: 'Judul Blog',
          selector: 'title',
          sortable: true
        },
        {/*
          name: 'Aktif',
          sortable: true,
          cell: row => <>
          <Formik
                            initialValues={{ 
                                id: row.id_seminar, 
                                aktif_seminar: ''
                            }}
                            onSubmit={(values, actions) => {
                                alert('Apakah anda yakin akan mengubah data ini?');
                                API.PutStatusSeminar(values).then(res=>{
                                  //console.log(res)
                                  if (res.status === 1 ) {
                                      toast.success("Data berhasil disimpan", {position: "top-center"});
                                  } 
                                  
                              }).catch(err => {
                                  console.log(err.response)
                                  toast.warn("Tidak ada data yang diubah", {position: "top-center"});

                              })
                                
                                setTimeout(() => {
                                actions.setSubmitting(false);
                                }, 1000);
                            }}
                            >
                            {({
                                handleSubmit,
                                handleChange,
                                handleBlur,
                                values,
                                touched,
                                errors,
                                isSubmitting
                            }) => (
                        <Form onChange={handleSubmit}>
                            <Form.Control as="select" name="aktif_seminar" onChange={handleChange} defaultValue={row.aktif_seminar} onBlur={handleBlur} size="sm" custom>
                            <option value="Y" >{isSubmitting ? 
                           "loading..." : "Aktif"}
                           </option>
                            <option value='N' >{isSubmitting ? 
                             "loading..." : "Tidak Aktif"}
                             </option>
 
                            </Form.Control>
       
                     </Form>
                     )}
                    </Formik>
          </>,
        */},
        {
          name: 'Kategori',
          sortable: true,
          cell: row => <>
          <Formik
                            initialValues={{ 
                                id: row.id, 
                                category_id: '',
                                
                            }}
                            onSubmit={(values, actions) => {
                                alert('Apakah anda yakin akan mengubah data ini?');
                                API.PutBlogCategory(values).then(res=>{
                                  //console.log(res)
                                  if (res.status === 1 ) {
                                    toast.success("Data berhasil disimpan", {position: "top-center"});
                                  } 
                                  
                              }).catch(err => {
                                  console.log(err.response)
                                  toast.warn("Tidak ada data yang diubah", {position: "top-center"});

                              })
                                
                                setTimeout(() => {
                                actions.setSubmitting(false);
                                }, 1000);
                            }}
                            
                            >
                            {({
                                handleSubmit,
                                handleChange,
                                handleBlur,
                                values,
                                touched,
                                errors,
                                isSubmitting
                            }) => (
                        <Form onChange={handleSubmit}>
                            <Form.Control as="select" name="category_id" onChange={handleChange} defaultValue={row.category_id} onBlur={handleBlur} size="sm" custom>
                            <option value="">Choose Category</option>
                            {this.state.Category.map((b, i) => (<option value={b.id} key={i}>{isSubmitting ? 
                           "loading..." : b.name}</option>))}
 
                            </Form.Control>
                           
                     </Form>
                     )}
                    </Formik>
          </>,
        },
        {
          name: 'Aksi',
          sortable: false,
          cell: row => <><Button href={'/admin/blog/edit/'+row.id} size="sm" title="Edit" alt="Edit"><FaPencilAlt/></Button>&nbsp;
          <Button onClick={() => {
                this.dialog.show({
                  title: 'Konfirmasi',
                  body: 'Apakah anda yakin akan menghapus data ini?',
                  bsSize: 'lg',
                  actions: [
                    Dialog.CancelAction(() => {
                      console.log('Cancel was clicked!')
                    }),
                    Dialog.OKAction(() => {
                      API.DeleteBlog(row.id).then(res => {
                        if (res.status === 1) {
                            window.location.href = '/admin/blog';
                            toast.success("Hapus data berhasil", {position: "top-center"});
                        } else {
                            console.log('gagal')
                        }
                      })
                    })
                  ],
                  onHide: (dialog) => {
                    dialog.hide()
                    console.log('closed by clicking background.')
                  }
                })
              }} variant="danger" size="sm" title="Hapus" alt="Hapus"><FaTrash/></Button></>,
        },
      ];

      const customStyles = {
        rows: {
          style: {
            fontSize: '1rem',
          }
        },
        headCells: {
          style: {
            fontSize: '1rem',
          },
        },
        cells: {
          style: {
            fontSize: '1rem',
          },
        },
    };
    const TextField = styled.input`
      font-size: 14px;
      height: 34px;
      width: 250px;
      border-radius: 3px;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border: 1px solid #e5e5e5;
      padding: 0 32px 0 16px;
      &:hover {
        cursor: pointer;
      }
    `;
    const ClearButton = styled(Button)`
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      height: 34px;
      width: 32px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    const ExpandedStyle = styled.div`
      padding: 10px;
      display: block;
      width: 100%;

      p {
        font-size: 14px;
        font-weight: 400;
        word-break: break-all;
      }
    `;

    const ExpandedComponent = ({ data }) => (
      <ExpandedStyle>
        <p>
          Date Created: {data.created_at}<br/>
          Date Updated: {data.updated_at}<br/>
        </p>
      </ExpandedStyle>
    );

    const FilterComponent = ({ filterText, onFilter, onClear }) => (
      <>
      <Button href="/admin/blog/create" variant="primary" style={{ position: 'absolute', left: '0', marginLeft: '15px'}}>Tambah Blog</Button>
        <TextField id="search" type="text" placeholder="Filter By Judul" aria-label="Search Input" value={filterText} onChange={onFilter} />
        <ClearButton variant="secondary" type="button" onClick={onClear}>X</ClearButton>
      </>
    );
    
    const BasicTable = () => {
      const [filterText, setFilterText] = useState('');
      const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
      const filteredItems = this.state.Blog.filter(item => item.title && item.title.toLowerCase().includes(filterText.toLowerCase()) 
       );
    
      const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
          if (filterText) {
            setResetPaginationToggle(!resetPaginationToggle);
            setFilterText('');
          }
        };
    
        return <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />;
      }, [filterText, resetPaginationToggle]);
      
    
      return (
        <DataTable
          title="Semua Blog Post"
          columns={columns}
          data={filteredItems}
          pagination
          paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          //selectableRows
          //selectableRowsHighlight
          persistTableHead
          expandableRows
          expandOnRowClicked
          expandableRowsComponent={<ExpandedComponent />}
          customStyles={customStyles}
        />
      );
    };

        return (
          
            <Layout admin>
                <Head>
                    <title>Blog Post - {siteTitle}</title>
                </Head>
                <Container fluid>
                <Breadcrumb className="my-3">
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Blog Post</Breadcrumb.Item>
                </Breadcrumb>
                    <Row>
                  
                    <Col>

                        <Card body> 
                        { this.state.loading ?
                        <Loader options={options} className="spinner" />
                        
                        :
                        <>
                           
                           <BasicTable />
                           <Dialog ref={(component) => { this.dialog = component }} />
                        </>
                        }
                        </Card>
                    </Col>
                    </Row>
                </Container>
            </Layout>
        )
    }
}



export default Blog;