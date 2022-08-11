import { Modal, Button, Form, Container, Row, Col } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import React from 'react'
function Edititems(props) {
    console.log(props)
    let { register, handleSubmit, setValue } = useForm()
    useEffect(() => {
        setValue("dishname",props.itemObj.dishname)
        setValue("price", props.itemObj.price)
        setValue("description", props.itemObj.description)
        setValue("quantity",props.itemObj.quantity)
    }, [])
    return (
        <div>
            <Modal {...props} centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit the Item
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Container>
                        <Form className='w-100 mx-auto' onSubmit={handleSubmit(props.onHide)}>
                        <Row>
                                <Col xs={11} >
                                    <Form.Group className="mb-3" controlId="formBasicdishname">
                                        <Form.Label>Edit Dish Name</Form.Label>
                                        <Form.Control type="text" placeholder="Dish Name" {...register('dishname')} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={11}>
                                    <Form.Group className="mb-3" controlId="formBasicprice">
                                        <Form.Label>Edit Price</Form.Label>
                                        <Form.Control type="text" placeholder="Price" {...register("price")} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={11} >
                                    <Form.Group className="mb-3" controlId="formBasicquantity">
                                        <Form.Label>Edit Quantity</Form.Label>
                                        <Form.Control type="text" placeholder="Quantity" {...register('quantity')} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={11} >
                                    <Form.Group className="mb-3" controlId="formBasicdescription">
                                        <Form.Label>Edit Description</Form.Label>
                                        <Form.Control type="text" placeholder="Description" {...register('description')} />
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
export default React.memo(Edititems);