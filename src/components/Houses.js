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
          width={290}
          height={290}
          src={`https://api.got.show${result.imageLink}`}
        />
      );
    } else return null;
  };

  checkRegion = (result) => {
    if (result.hasOwnProperty('region') === true) {
      return (
        <Card.Meta>of the {result.region}</Card.Meta>
      );
    } else {
      return <Card.Meta>of the Unnamed Region</Card.Meta>;
    }
  };

  showResults = () => {
    const { results, toggleResult } = this.state;
    if (results.length === 0 && toggleResult === true) {
      return (
        <Header textAlign="center">
          Did that House burn by wildfire?
          <Header.Subheader as="h5" textAlign="center">
            we couldn't find it...
          </Header.Subheader>
        </Header>
      );
    } else {
      return results.map((result) => (
        <Grid.Column key={result.id}>
          <Card>
            {this.checkImage(result)}
            <Card.Content>
              <Card.Header>{result.name}</Card.Header>
              <Card.Meta>
                {this.checkRegion(result)}
              </Card.Meta>
            </Card.Content>
          </Card>
        </Grid.Column>
      ));
    }
  };

  render() {
    return (
      <Container>
        <Divider hidden />
        <Header as="h2" textAlign="center">
          Houses of the Seven Kingdoms
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
            <Card.Group>{this.showResults()}</Card.Group>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default Houses;
