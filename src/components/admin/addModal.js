import React, { Component } from "react";
import { Icon, message, Rate, Divider, Table, Input, Row, Col, InputNumber, Button, Select } from 'antd';
import {clone} from "../../common/utils";
import "../../css/add.scss";

const { TextArea } = Input;
const Option = Select.Option;
const nutrition = {
    name: "name",
    kcal: "kcal",
    protein: "protein",
    fat: "fat",
    carbohydrate: "carbohydrate",
    DF: "DF",
    VA: "VA",
    VC: "VC",
    VE: "VE",
    carotene: "carotene",
    VB1: "VB1",
    VB2: "VB2",
    niacin: "niacin",
    cholesterol: "cholesterol",
    MG: "MG",
    CA: "CA",
    FE: "FE",
    ZN: "ZN",
    CU: "CU",
    MN: "MN",
    K: "K",
    P: "P",
    NA: "NA",
    SE: "SE",
    rate: "rate",
    remark: "remark"
}

export default class AddModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            categoryId: "",
            kcal: null,
            protein: null,
            fat: null,
            carbohydrate: null,
            DF: null,
            VA: null,
            VC: null,
            VE: null,
            carotene: null,
            VB1: null,
            VB2: null,
            niacin: null,
            cholesterol: null,
            MG: null,
            CA: null,
            FE: null,
            ZN: null,
            CU: null,
            MN: null,
            K: null,
            P: null,
            NA: null,
            SE: null,
            rate: 0,
            remark: "",
            imgHasSelected: false,
            file: null,
            imgUrl: null
        }
    }
    renderCategory() {
        return this.props.category.map((item, index) => {
            return <Option value = {item._id} key = {index} >{item.name}</Option>
        })
    }
    selectCategory(categoryId) {
        this.setState({
            categoryId
        })
    }
    changeValue(e, type) {
        const value = e || e == 0 ? e.target ? e.target.value : e : null ;
        this.setState({
            [type]: value
        })
    }
    selectImg() {
        const fileEle = this.refs.file;
        const file = fileEle.files[0];
        if(file) {
            const reader = new FileReader();
            //创建文件读取相关的变量
            let imgFile;
            //为文件读取成功设置事件
            reader.onload = e => {
                imgFile = e.target.result;
                this.setState({
                    imgHasSelected: true,
                    file,
                    imgUrl: null
                }, () => {
                    this.refs.avatar.src = imgFile;
                })
            };
            reader.onerror = e => {
                message.error("图片读取失败");
                this.setState({
                    imgHasSelected: false
                })
            }
            //读取文件
            reader.readAsDataURL(file);
        }
        else {
            if(this.state.file) {
                this.setState({
                    imgUrl: null
                })
            }
            else {
                this.setState({
                    imgUrl: this.props.food.imgUrl, 
                    file: null
                })
            }
        }
    }
    validateForm() {
        let flag = true;
        for(let key in nutrition) {
            if(!this.state[key] && this.state[key] !== 0) {
                flag = false;
            }
        }
        return flag;
    }
    submit() {
        if(!this.state.file && !this.state.imgUrl) {
            message.warning("请上传图片");
            return;
        }
        if(!this.state.categoryId) {
            message.warning("请选择食物分类");
            return;
        }
        if(!this.validateForm()) {
            message.warning("请补全表单");
            return;
        }
        let formData = new FormData();
        formData.append("imgUrl", this.state.file);
        formData.append("categoryId", this.state.categoryId);
        formData.append("name", this.state.name);
        formData.append("token", userInfo.token);
        formData.append("kcal", this.state.kcal);
        formData.append("protein", this.state.protein);
        formData.append("fat", this.state.fat);
        formData.append("carbohydrate", this.state.carbohydrate);
        formData.append("DF", this.state.DF);
        formData.append("VA", this.state.VA);
        formData.append("VC", this.state.VC);
        formData.append("VE", this.state.VE);
        formData.append("carotene", this.state.carotene);
        formData.append("VB1", this.state.VB1);
        formData.append("VB2", this.state.VB2);
        formData.append("niacin", this.state.niacin);
        formData.append("cholesterol", this.state.cholesterol);
        formData.append("MG", this.state.MG);
        formData.append("CA", this.state.CA);
        formData.append("FE", this.state.FE);
        formData.append("ZN", this.state.ZN);
        formData.append("CU", this.state.CU);
        formData.append("MN", this.state.MN);
        formData.append("K", this.state.K);
        formData.append("P", this.state.P);
        formData.append("NA", this.state.NA);
        formData.append("SE", this.state.SE);
        formData.append("rate", this.state.rate);
        formData.append("remark", this.state.remark);
        if(!this.props.isAdd) {
            formData.append("foodId", this.props.food._id);
            formData.append("oldImgUrl", this.state.imgUrl);
            this.props.actions.editFood(formData, () => {
                window.location.reload();
            })
        }
        else {
            this.props.actions.addFood(formData, () => {
                window.location.reload();
            });
        }
    }
    componentWillMount() {
        if(!this.props.isAdd) {
            const _state = clone(this.state);
            this.setState(Object.assign({}, _state, this.props.food));
        }
    }
    componentDidMount() {
        !this.props.isAdd && this.setState({
            imgHasSelected: true
        }, () => {
            this.refs.avatar.src = this.state.imgUrl
        })
    }
    render() {
        const food = {}
        return (
            <div className = "food-add" >
                <div className = "food-title flex justify-space-between align-center" >
                    <div className = "flex" >
                        <div className = "img-upload">
                            <div className = "a-upload" >
                                <input ref = "file" type = "file" accept = ".png,.jpg" onChange = {() => this.selectImg()} />
                                {
                                    this.state.imgHasSelected ? <img ref = "avatar" /> :  <Icon type="plus" />
                                }
                            </div>
                        </div>
                        <div style = {{marginLeft: 20}} >
                            <div>
                                <span className = "food-name" >食物名：</span>
                                <Input className = "food-name-input" value = {this.state.name} onChange = {e => this.changeValue(e, nutrition.name)} />
                            </div> 
                            <div style = {{marginTop: 10}}>
                                <span className = "kcal" >热量：</span>
                                <InputNumber min = {0} className = "food-name-input" value = {this.state.kcal} onChange = {e => this.changeValue(e, nutrition.kcal)} /> 千卡 / 100克
                            </div>
                        </div>
                    </div>
                    <div className ="flex flex-column" >
                        <Rate count = {3} value = {this.state.rate} onChange = {e => this.changeValue(e, nutrition.rate)} />
                        <Divider/>
                        <Select value = {this.state.categoryId} style={{ width: 120 }} onChange = {value => {this.selectCategory(value)}} >
                            <Option value="">食物分类</Option>
                            {this.renderCategory()}
                        </Select>
                    </div>
                </div>
                <div className = "basic flex justify-space-around" >
                    <div style = {{width:"33.33%"}} >蛋白质：<InputNumber min = {0} className = "small-input" size = "small" value = {this.state.protein} onChange = {e => this.changeValue(e, nutrition.protein)} /> 克</div>
                    <div style = {{width:"33.33%"}} >脂肪：<InputNumber min = {0} className = "small-input" size = "small" value = {this.state.fat} onChange = {e => this.changeValue(e, nutrition.fat)} /> 克</div>
                    <div style = {{width:"33.33%"}} >碳水化合物：<InputNumber min = {0} className = "small-input" size = "small" value = {this.state.carbohydrate} onChange = {e => this.changeValue(e, nutrition.carbohydrate)} /> 克</div>
                </div>
                <div className = "basic flex justify-space-around" >
                    <div style = {{width:"33.33%"}} >膳食纤维：<InputNumber min = {0} className = "small-input" size = "small" value = {this.state.DF} onChange = {e => this.changeValue(e, nutrition.DF)} /> 克</div>
                    <div style = {{width:"33.33%"}} >烟酸：<InputNumber min = {0} className = "small-input" size = "small" value = {this.state.niacin} onChange = {e => this.changeValue(e, nutrition.niacin)} /> 克</div>
                    <div style = {{width:"33.33%"}} >胆固醇：<InputNumber min = {0} className = "small-input" size = "small" value = {this.state.cholesterol} onChange = {e => this.changeValue(e, nutrition.cholesterol)} /> 克</div>
                </div>
                <Divider>维生素 / 100mg</Divider>
                    <Row>
                        <Col span = {4} >维生素A</Col>
                        <Col span = {4} >维生素C</Col>
                        <Col span = {4} >维生素E</Col>
                        <Col span = {4} >胡萝卜素</Col>
                        <Col span = {4} >维生素B1</Col>
                        <Col span = {4} >维生素B2</Col>
                    </Row>
                    <Row>
                        <Col span = {4} >
                            <InputNumber min = {0} className = "small-input" size = "small" value = {this.state.VA} onChange = {e => this.changeValue(e, nutrition.VA)} />
                        </Col>
                        <Col span = {4} >
                            <InputNumber min = {0} className = "small-input" size = "small" value = {this.state.VC} onChange = {e => this.changeValue(e, nutrition.VC)} />
                        </Col>
                        <Col span = {4} >
                            <InputNumber min = {0} className = "small-input" size = "small" value = {this.state.VE} onChange = {e => this.changeValue(e, nutrition.VE)} />
                        </Col>
                        <Col span = {4} >
                            <InputNumber min = {0} className = "small-input" size = "small" value = {this.state.carotene} onChange = {e => this.changeValue(e, nutrition.carotene)} />
                        </Col>
                        <Col span = {4} >
                            <InputNumber min = {0} className = "small-input" size = "small" value = {this.state.VB1} onChange = {e => this.changeValue(e, nutrition.VB1)} />
                        </Col>
                        <Col span = {4} >
                            <InputNumber min = {0} className = "small-input" size = "small" value = {this.state.VB2} onChange = {e => this.changeValue(e, nutrition.VB2)} />
                        </Col>
                    </Row>
                <Divider>微量元素 / 100mg</Divider>
                <div className = "nutrient-first" >
                    <Row>
                        <Col span = {6} >镁</Col>
                        <Col span = {6} >钙</Col>
                        <Col span = {6} >铁</Col>
                        <Col span = {6} >锌</Col>
                    </Row>
                    <Row>
                        <Col span = {6} >
                            <InputNumber min = {0} className = "small-input" size = "small" value = {this.state.MG} onChange = {e => this.changeValue(e, nutrition.MG)} />
                        </Col>
                        <Col span = {6} >
                            <InputNumber min = {0} className = "small-input" size = "small" value = {this.state.CA} onChange = {e => this.changeValue(e, nutrition.CA)} />
                        </Col>
                        <Col span = {6} >
                            <InputNumber min = {0} className = "small-input" size = "small" value = {this.state.FE} onChange = {e => this.changeValue(e, nutrition.FE)} />
                        </Col>
                        <Col span = {6} >
                            <InputNumber min = {0} className = "small-input" size = "small" value = {this.state.ZN} onChange = {e => this.changeValue(e, nutrition.ZN)} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span = {6} >铜</Col>
                        <Col span = {6} >锰</Col>
                        <Col span = {6} >钾</Col>
                        <Col span = {6} >磷</Col>
                    </Row>
                    <Row>
                        <Col span = {6} >
                            <InputNumber min = {0} className = "small-input" size = "small" value = {this.state.CU} onChange = {e => this.changeValue(e, nutrition.CU)} />
                        </Col>
                        <Col span = {6} >
                            <InputNumber min = {0} className = "small-input" size = "small" value = {this.state.MN} onChange = {e => this.changeValue(e, nutrition.MN)} />
                        </Col>
                        <Col span = {6} >
                            <InputNumber min = {0} className = "small-input" size = "small" value = {this.state.P} onChange = {e => this.changeValue(e, nutrition.P)} />
                        </Col>
                        <Col span = {6} >
                            <InputNumber min = {0} className = "small-input" size = "small" value = {this.state.K} onChange = {e => this.changeValue(e, nutrition.K)} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span = {6} >纳</Col>
                        <Col span = {6} >硒</Col>
                    </Row>
                    <Row>
                        <Col span = {6} >
                            <InputNumber min = {0} className = "small-input" size = "small" value = {this.state.NA} onChange = {e => this.changeValue(e, nutrition.NA)} />
                        </Col>
                        <Col span = {6} >
                            <InputNumber min = {0} className = "small-input" size = "small" value = {this.state.SE} onChange = {e => this.changeValue(e, nutrition.SE)} />
                        </Col>
                    </Row>
                </div>
                
                <Divider>小贴士</Divider>
                <TextArea className = "tips" rows = {3} value = {this.state.remark} onChange = {e => this.changeValue(e, nutrition.remark)} />
                <Divider/>
                <Button type="primary" onClick = {() => this.submit()} >提交</Button>
            </div>
        )
    }
}