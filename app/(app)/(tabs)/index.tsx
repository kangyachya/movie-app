import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxODUzMWNlZDMzZGRhMjEyYWU2MjYwNjY5MTFiMjZmMSIsIm5iZiI6MTU2NDUzOTYxOC4zMjksInN1YiI6IjVkNDBmYWUyMzRlMTUyMzhmY2VkMDE3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.c2ik-I7GJnzkCEEZCZZDS6t4Z-y2qteOdnuaj2Vo234",
      },
    };

    fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
      options
    )
      .then((res) => res.json())
      .then((json) => {
        setMovies(json.results || []);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={({ item }) => (
          <View style={styles.banner}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}`,
              }}
              style={styles.bannerImg}
            />
            <View style={styles.bannerText}>
              <Text style={styles.subTitle}>{item.title}</Text>
              <Text style={styles.desc}>Rating: {item.vote_average}⭐</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", paddingTop: 20 },
  sectionTitle: { color: "#fff", fontSize: 18, marginLeft: 15, marginBottom: 10 },
  banner: {
    width: width, // biar full screen tiap slide
    height: 220,
    position: "relative",
  },
  bannerImg: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  bannerText: {
    position: "absolute",
    bottom: 20,
    left: 15,
  },
  subTitle: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  desc: { color: "#fff", marginTop: 5 },
});
