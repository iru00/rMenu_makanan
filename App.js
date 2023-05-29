import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const menuData = [
  {
    id: 1,
    name: 'Nasi Goreng',
    image: require('./image/nasgor.jpg'),
    description: 'Nasi goreng spesial dengan bumbu khas',
    price: 15000,
  },
  {
    id: 2,
    name: 'Mie Ayam',
    image: require('./image/miea.jpg'),
    description: 'Mie ayam dengan irisan daging ayam dan sayuran',
    price: 12000,
  },
  {
    id: 3,
    name: 'Bakso',
    image: require('./image/bakso.jpg'),
    description: 'Bakso dengan mie kuning dan kaldu sapi',
    price: 10000,
  },
  {
    id: 4,
    name: 'Gudeg',
    image: require('./image/gudeg.jpg'),
    description: 'Gudeg dengan sayuran segar',
    price: 13000,
  },
  {
    id: 5,
    name: 'Gado-gado',
    image: require('./image/gado.jpg'),
    description: 'Gado-gado dengan sayuran segar',
    price: 10000,
  },
  {
    id: 6,
    name: 'Kerak Telor',
    image: require('./image/kerak-telor.jpg'),
    description: 'Kerak telor dengan telor bebek',
    price: 15000,
  },
  {
    id: 7,
    name: 'Rawon',
    image: require('./image/rawon.jpg'),
    description: 'Rawon dengan daging pilihan',
    price: 12000,
  },
  {
    id: 9,
    name: 'Rendang',
    image: require('./image/rend.jpg'),
    description: 'Rendang asli padang',
    price: 12000,
  },
  {
    id: 10,
    name: 'Ayam Bakar',
    image: require('./image/ayam.jpg'),
    description: 'Ayam bakar penuh rempah',
    price: 12000,
  },
];

const App = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleItemPress = (item) => {
    const selectedItem = selectedItems.find((selectedItem) => selectedItem.id === item.id);
    if (selectedItem) {
      const updatedItems = selectedItems.filter((selectedItem) => selectedItem.id !== item.id);
      setSelectedItems(updatedItems);
      setTotalPrice(totalPrice - item.price);
    } else {
      const updatedItems = [...selectedItems, item];
      setSelectedItems(updatedItems);
      setTotalPrice(totalPrice + item.price);
    }
  };

  const renderItem = ({ item }) => {
    const selectedItem = selectedItems.find((selectedItem) => selectedItem.id === item.id);
    return (
      <TouchableOpacity
        style={[styles.itemContainer, selectedItem && styles.selectedItemContainer]}
        onPress={() => handleItemPress(item)}
      >
        <Image source={item.image} style={styles.itemImage} />
        <View style={styles.itemInfoContainer}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemDescription}>{item.description}</Text>
          <Text style={styles.itemPrice}>Rp {item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderOrderSummary = () => {
    return (
      <View style={styles.orderSummaryContainer}>
        <Text style={styles.orderSummaryText}>Pesanan Anda:</Text>
        <FlatList
          data={selectedItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text style={styles.selectedItemText}>
              {item.name} - Rp {item.price}
            </Text>
          )}
        />
        <Text style={styles.totalPriceText}>Total: Rp {totalPrice}</Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const handleCheckout = () => {
    // Menampilkan pop-up pesan saat tombol "Checkout" ditekan
    Alert.alert('Pesanan Diproses', 'Terima kasih atas pesanan Anda. Pesanan sedang diproses.', [
      { text: 'OK' }
    ]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={menuData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        extraData={selectedItems}
      />
      {selectedItems.length > 0 && renderOrderSummary()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  selectedItemContainer: {
    borderColor: 'blue',
    backgroundColor: '#eaf2ff',
  },
  itemImage: {
    width: 80,
    height: 80,
    marginRight: 12,
    borderRadius: 8,
  },
  itemInfoContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderSummaryContainer: {
    backgroundColor: 'white',
    marginTop: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  orderSummaryText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  selectedItemText: {
    fontSize: 16,
    marginBottom: 4,
  },
  totalPriceText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  checkoutButton: {
    marginTop: 12,
    backgroundColor: 'blue',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  checkoutButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;