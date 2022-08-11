import { Modal, Button, Form, Container, Row, Col } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import React from 'react'
function Editstatus(props) {
    console.log(props)
    let { register, handleSubmit, setValue } = useForm()
    useEffect(() => {
        setValue("message",props.statusobj.message)
       
    }, [])
    return (
        <div>
            <Modal {...props} centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Update the Status
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Form className='w-100 mx-auto' onSubmit={handleSubmit(props.onHide)}>
                        <Row>
                                <Col xs={11} >
                                    <Form.Group className="mb-3" controlId="formBasicdishname">
                                        <Form.Label>Select Status</Form.Label>
                                        <Form.Select  {...register('message')} >
                                            <option>Select update message</option>
                                            <option>Cancel Order</option>
                                            <option>Accept Order</option>
                                            <option>Order Preparing</option>
                                            <option>Order Packing</option>
                                            <option>On The Way</option>
                                            <option>Delivered</option>
                                            </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                           
                            <Button type="submit">Save</Button>
                        </Form>
                    </Container>
                </Modal.Body>

            </Modal>
        </div>
    );


}
export default React.memo(Editstatus);