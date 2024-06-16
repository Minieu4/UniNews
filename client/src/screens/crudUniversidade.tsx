import React, { useState, useEffect } from 'react';
import { View, Button } from 'react-native';
import { styles } from '../styles/styleCrudUniversidade';
import { useUniversityCrud } from '../hooks/universityHooks';
import {
  Container,
  ScrollContainer,
  NameBlue,
  Name,
  BackgroundInputText,
  BorderColorTable,
  BackgroundContainerInput,
} from '../theme/style';
import { Header } from '../components/addHeader/header';
import { Table } from '../components/addTableUniversity/TableUniversity';
import { StatusBar } from 'expo-status-bar';

export function CrudUniversidade() {
  const [isChecked, setChecked] = useState(false);
  const { 
    universities,
    university,
    setUniversity,
    fetchUniversities,
    updateUniversityHandler,
    addUniversityHandler,
    deleteUniversityHandler,
  } = useUniversityCrud();

  useEffect(() => {
    fetchUniversities();
  }, []);

  const handleRowClick = (university: any) => {
    setUniversity(university);
  };

  return (
    <>
      <Header />
      <Container style={styles.container}>
        <ScrollContainer>
          <View style={styles.containerDados}>
            <View style={styles.viewDados}>
              <NameBlue style={styles.titulo}>Dados</NameBlue>
              <BackgroundContainerInput style={styles.containerInput}>
                <Name>Nome</Name>
                <BackgroundInputText
                  style={styles.input}
                  placeholder="Nome da Universidade"
                  placeholderTextColor={'#8F8F8F'}
                  value={university.name}
                  onChangeText={(n) => setUniversity({ ...university, name: n })}
                />
                <Name>Localização</Name>
                <BackgroundInputText
                  style={styles.input}
                  placeholder="Localização"
                  placeholderTextColor={'#8F8F8F'}
                  value={university.location}
                  onChangeText={(e) => setUniversity({ ...university, location: e })}
                />
                <Name>URL</Name>
                <BackgroundInputText
                  style={styles.input}
                  placeholder="URL"
                  placeholderTextColor={'#8F8F8F'}
                  value={university.url}
                  onChangeText={(e) => setUniversity({ ...university, url: e })}
                />
                <Name>Descrição</Name>
                <BackgroundInputText
                  style={styles.inputdisc}
                  placeholder="Descrição"
                  placeholderTextColor={'#8F8F8F'}
                  value={university.description}
                  onChangeText={(e) => setUniversity({ ...university, description: e })}
                />
              </BackgroundContainerInput>
            </View>
            <View style={styles.containerButton}>
              <Button title="Cadastrar" onPress={addUniversityHandler} />
              <Button title="Ver Todos" onPress={fetchUniversities} />
              <Button
                title="Alterar"
                onPress={() => updateUniversityHandler(university.id, university)}
              />
              <Button
                title="Apagar"
                onPress={() => deleteUniversityHandler(university.id)}
              />
            </View>
          </View>
          <View style={styles.containerTable}>
            <NameBlue style={styles.titulo}>Dados Inseridos</NameBlue>
            <BorderColorTable style={styles.table}>
              <Table universities={universities} onRowClick={handleRowClick} />
            </BorderColorTable>
          </View>
          <StatusBar style="auto" />
        </ScrollContainer>
      </Container>
    </>
  );
}
