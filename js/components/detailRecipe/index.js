
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Thumbnail, Picker, Content, Button, Icon, Left, Right, Body, Text, List, ListItem, CheckBox, Card, CardItem } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Image } from 'react-native';
import styles from './styles';

import { actions } from 'react-native-navigation-redux-helpers';
import { openDrawer } from '../../redux/actions/drawer';

import { rebase } from '../../../index.android';

const ACC_VIO = 'rgb(124, 90, 150)';
const ACC_CREAM = 'rgb(252, 244, 217)';
const ACC_PEACH = 'rgb(255, 184, 95)';
const ACC_DARK_PEACH = 'rgb(255, 122, 90)';
const ACC_TEAL = 'rgb(142, 210, 210)';
const ACC_DARK_TEAL = 'rgb(0, 170, 160)';

const ITEMS = [
  {name:"Sushi ryža",
  amount:"200g"},
  {name:"Čerstvý losos",
  amount:"100g"},
  {name:"Avokádo",
  amount:"50g"},
  {name:"Ryžový ocot",
  amount:"30ml"},
  {name:"Cukor",
  amount:"5g"},
  {name:"Soľ",
  amount:"5g"},
  {name:"Sójovka",
  amount:"--"},
]

class Header6 extends Component {  // eslint-disable-line

  constructor(props) {
      super(props);
      this.state = {
        selected: "key1",
        show: false,
        ingredients: [],
        name: this.props.recName,
        key: this.props.recId,
        postup: this.props.recSteps,
      };

        rebase.fetch(`recipes/${this.props.recId}/ingrediencie`, {
            context: this,
            withIds: true,
            asArray: true,
          }).then((ings) => {rebase.fetch(`ingredients`, {
              context: this,
              withIds: true,
              asArray: true,
            }).then((allIngs) => {
              let ids = ings.map(i => i.key);
              let filterred = allIngs.filter(i => ids.includes(i.key)).map(ing => { let k = {name: ing.name, key: ing.key, amount: ings.filter(i => i.key === ing.key)[0].amount}; return k;});
              this.setState({
                ingredients: filterred,
              })
            })
          });
    }

    onValueChange(value: string) {
      this.setState({
        selected: value
      });
    }

    onOff() {
      this.setState({
        show: !this.state.show,
      });
    }

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: ACC_TEAL}}>
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name="arrow-back" style={{ color: ACC_DARK_TEAL}}/>
            </Button>
          </Left>
          <Body>
            <Title style={{ color: ACC_DARK_TEAL}} >{this.state.name}</Title>
          </Body>
          <Right>
            <Button transparent><Icon name="md-more" style={{ color: ACC_DARK_TEAL}} onPress={()=> this.setState({show: true })}/><Text></Text></Button>
          </Right>

        </Header>

        <Content padder style={{ backgroundColor: ACC_CREAM}}>

          {
          this.state.show &&
          <List>
            <ListItem button>
              <Icon name="md-share-alt" style={{ color: ACC_DARK_TEAL}}/>
              <Text>Share</Text>
            </ListItem>
             <ListItem button onPress={()=> {this.setState({show: false}); Actions.editRec({nom:'jedlo'});}}>
              <Icon name="md-create" style={{ color: ACC_DARK_TEAL }} />
              <Text>Edit</Text>
              </ListItem>
           <ListItem button>
              <Icon name="md-trash" style={{ color: ACC_DARK_TEAL}}/>
              <Text>Remove</Text>
            </ListItem>
          </List>
          }

         <List>
            <ListItem noBorder key="obr">
              <Image
                  style={styles.stretch}
                  source={require('../../../sushi.jpg')}
                />
            </ListItem>
         {
           this.state.ingredients.map(item => {return (
             <ListItem noBorder key={item.key}>
               <Left>
               <Thumbnail
                 style={styles.thumbnl}
                 source={require('../../../sushi.jpg')}
               />
                 <Text style={{ color: ACC_DARK_PEACH}}>{item.name}</Text>
                 </Left>
              <Right>

                  <Button transparent><Text style={{ color: ACC_DARK_PEACH }}>{item.amount + "   "} </Text><Icon name="md-remove-circle" style={{ color: ACC_PEACH }}/></Button>
              </Right>
            </ListItem>)
           })
        }
        <ListItem>
          <Right>
            <Button transparent><Text style={{ color: ACC_DARK_PEACH }}> Odobrať všetky </Text><Icon name="md-remove-circle" style={{ color: ACC_DARK_PEACH}}/></Button>
          </Right>
          </ListItem>

            <ListItem>
                <Text style={{ color: ACC_DARK_PEACH }}> {this.props.recSteps}</Text>
            </ListItem>
         </List>
        </Content>
      </Container>
    );
  }
}


function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  themeState: state.drawer.themeState,
});

export default connect(mapStateToProps, bindAction)(Header6);