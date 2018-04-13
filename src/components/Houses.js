import React from 'react';
import axios from 'axios';
import {
  Card,
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Image,
  Label,
} from 'semantic-ui-react';

class Houses extends React.Component {
  state = {
    houses: [],
    house: '',
    results: [],
    toggleResult: false,
  };

  componentDidMount() {
    axios
      .get('https://api.got.show/api/houses')
      .then((res) => {
        this.setState({ houses: res.data });
      });
  }

  findHouses = (house) => {
    const { houses } = this.state;
    let results = [];
    houses.map((h) => {
      h.name.toLowerCase().includes(house.toLowerCase())
        ? results.push(h)
        : null;
    });
    this.setState({
      results: results,
      toggleResult: true,
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    const { house } = this.state;
    e.preventDefault();
    this.findHouses(house);
  };

  checkImage = (result) => {
    if (result.hasOwnProperty('imageLink') === true) {
      return (
        <Image
          src={`https://api.got.show${result.imageLink}`}
        />
      );
    } else {
      return (
        <Label
          content="Image not found!"
          icon="warning"
        />
      );
    }
  };

  showResults = () => {
    const { results, toggleResult } = this.state;
    if (results.length === 0 && toggleResult === true) {
      return (
        <Grid.Column width={16}>
          <Header textAlign="center">
            Did that House burn by wildfire?
            <Header.Subheader as="h5" textAlign="center">
              we couldn't find it...
            </Header.Subheader>
          </Header>
        </Grid.Column>
      );
    } else {
      return results.map((result) => (
        <Grid.Column key={result.id} width={4}>
          <Card>
            {this.checkImage(result)}
            <Card.Content>
              <Card.Header as="h3">
                {result.name}
              </Card.Header>
            </Card.Content>
          </Card>
          <Divider hidden />
        </Grid.Column>
      ));
    }
  };

  render() {
    return (
      <Container>
        <Divider hidden />
        <Header textAlign="center">
          Houses of Westeros
        </Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            name="house"
            onChange={this.handleChange}
            placeholder="Search for a House..."
          />
        </Form>
        <Divider hidden />
        <Grid>
          <Grid.Row stretched>
            {this.showResults()}
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default Houses;
