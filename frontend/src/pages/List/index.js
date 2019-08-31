import React, { Component } from 'react'

import { api } from '../../services/api'
// import Auth from '../../auth'
import Header from '../../components/Header'
import { Container, Developer } from './style'
import { Icon, Input, Label, Button } from 'semantic-ui-react'

export default class List extends Component {
    state = {
        list: {},
        inputListName: ''
    }

    componentDidMount() {
        this.loadList()
    }
    
    loadList() {
        const { id } = this.props.match.params
        
        api.get(`/list/${id}`)
        .then((response) => {
            this.setState({ list: response.data })
        }).catch((error) => {
            console.log(error.response)
        })
    }

    putTag(tag, dev) {
        dev.tags.push(tag)

        dev.tags = dev.tags.filter(function(value, index, self) { 
            return self.indexOf(value) === index
        })

        api.put('/list', this.state.list)
            .then((response)=>{
                this.loadList()
            }).catch((error)=>{
                console.log(error.response)
            })
    }

    removeTag(tag, dev) {
        dev.tags = dev.tags.filter(e => e !== tag)

        api.put('/list', this.state.list)
            .then((response)=>{
                this.loadList()
            }).catch((error)=>{
                console.log(error.response)
            })
    }

    updateListName() {
        if(this.state.inputListName.length > 0) {
            const list = this.state.list
            list.name = this.state.inputListName
            
            api.put('/list', list)
                .then((response)=>{
                    this.setState({ inputListName: ''})
                    this.loadList()
                }).catch((error)=>{
                    console.log(error.response)
                })
        }
    }

    deleteList() {
        if(window.confirm('Tem certeza que deseja excluir a lista '+this.state.list.name+'?')){
            const id = this.state.list._id
            console.log(id)
    
            api.delete(`list/${id}`)
                .then((response)=>{
                    this.props.history.push('/')
                }).catch((error)=>{
                    console.log(error.response)
                })
        }
    }

    render() {
        return (
            <>
            <Header />
            <Container>
                <div className="sideMenu">
                    <Input
                        placeholder="Renomear Lista?"
                        icon={{name:"save", link:true, onClick: () => this.updateListName() }}
                        value={this.state.inputListName}
                        name="inputListName"
                        onChange={e => this.setState({ [e.target.name]: e.target.value })}
                        onKeyUp={e => (e.keyCode === 13) ? this.updateListName() : false}
                        size="mini"
                    />
                    <Button color="red" onClick={() => this.deleteList()}>
                        <Icon
                            name="trash"
                            
                        />
                        Excluir Lista
                    </Button>
                </div>
                <div className="main">
                    <h1>{this.state.list.name}</h1>
                        {
                            this.state.list.devs ?
                                this.state.list.devs.length ?
                                    <div id="devsList">
                                        {
                                            this.state.list.devs.map(
                                                dev => (
                                                    <Developer key={dev._id}>
                                                        <div>
                                                            <Icon name="at" />
                                                            <span>{dev.login}</span>
                                                            {
                                                                dev.tags ? 
                                                                    dev.tags.map(
                                                                        tag => (
                                                                            <Label color="teal" key={tag}>
                                                                                {tag}
                                                                                <Icon
                                                                                    name="delete"
                                                                                    onClick={() => this.removeTag(tag, dev)}
                                                                                />
                                                                            </Label>
                                                                        )
                                                                    )
                                                                :
                                                                    false
                                                            }
                                                        </div>

                                                        <div>
                                                        <Input
                                                            icon='tag'
                                                            placeholder='Adicionar Tag'
                                                            onKeyUp={e => (e.keyCode === 13) ? (this.putTag(e.target.value, dev),e.target.value='') : false}
                                                            name="tags"
                                                            size="mini"
                                                        />
                                                        </div>
                                                    </Developer>
                                                )
                                            )
                                        }
                                    </div>
                                :
                                    'Nenhum Dev na lista'
                            :
                                ''
                        }
                </div>
            </Container>
            </>
        )
    }
}
