import { Text, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({ route }) => {
  console.log("route:", route.params);

  return (
    <View style={styles.container}>
      {route.params.latitude ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: route.params.latitude || null,
            longitude: route.params.longitude || null,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: route.params.latitude || null,
              longitude: route.params.longitude || null,
            }}
            title={route.params.name}
          />
        </MapView>
      ) : (
        <Text>No location data</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapScreen;
