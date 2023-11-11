import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

class RandomPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      genres: [],
      formData: {
        rating: 0,
        rangeStart: "",
        rangeEnd: "",
        genre: "",
      },
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchGenres = this.fetchGenres.bind(this);
  }

  componentDidMount() {
    this.fetchGenres();
  }

  fetchGenres() {
    axios
      .get("https://api.rawg.io/api/genres", {
        params: {
          key: "aa75f8b611e2410c8b7bdf0223c912dc",
        },
      })
      .then((response) => {
        const genres = response.data.results.map((genre) => genre.name);
        this.setState({ genres });
      });
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: name === "rating" ? parseInt(value, 10) : value,
      },
    }));
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.formData);
    // Handle form submission logic here
  }

  render() {
    const { genres, formData } = this.state;

    return (
      <div>
        <h1>Random Page</h1>
        <form onSubmit={this.handleSubmit}>
          {/* Form fields */}
          <div>
            <label htmlFor="rating">Rating:</label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="rangeStart">Range Start:</label>
            <input
              type="date"
              id="rangeStart"
              name="rangeStart"
              value={formData.rangeStart}
              onChange={this.handleInputChange}
            />
            <label htmlFor="rangeEnd">Range End:</label>
            <input
              type="date"
              id="rangeEnd"
              name="rangeEnd"
              value={formData.rangeEnd}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="genre">Genre:</label>
            <select
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={this.handleInputChange}
            >
              {genres.length > 0 ? (
                genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))
              ) : (
                <option>Loading genres...</option>
              )}
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

RandomPage.propTypes = {
  formData: PropTypes.shape({
    rating: PropTypes.number,
    rangeStart: PropTypes.string,
    rangeEnd: PropTypes.string,
    genre: PropTypes.string,
  }),
};

export default RandomPage;
