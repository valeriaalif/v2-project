import React, { useState, useEffect } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router'
import { View, ScrollView, Image } from 'react-native';
import axios from 'axios';
import { Button, Card, Text, TextInput } from 'react-native-paper';
import { Link } from 'expo-router';
import Constants from 'expo-constants';

// Define the CourseInfo interface
interface CourseInfo {
  id: string;
  title: string;
  teacher: string;
  sendEmailDate: string;
  benefits: string;
  audience: string;
  requirements: string;
  description: string;
  content: string;
}

export default function Page() {
    const {id} = useLocalSearchParams();
    const [course, setCourse] = useState<CourseInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [text, setText] = React.useState("");
    
    const apiUrl = Constants.expoConfig?.extra?.API_URL;

    useEffect(() => {
      const fetchCourse = async () => {
        console.log("Fetching course from:", apiUrl); // Log the API URL
        try {
          const response = await axios.get(`${apiUrl}/api/getCourseBabies/${id}`);
          console.log("Fetched courses data:", response.data); // Log the fetched data
          setCourse(response.data);
          setLoading(false);
        } catch (err) {
          console.error("Error fetching course:", err); // Log any error
          setError('Failed to load course');
          setLoading(false);
        }
      };
  
      fetchCourse();
    }, [apiUrl, id]);
  
    if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Loading...</Text>
        </View>
      );
    }
  
    if (error) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>{error}</Text>
        </View>
      );
    }

      // Function to split description into 3 parts
      const splitDescription = (description: string) => {
        const paragraphLength = Math.ceil(description.length / 3); // Calculate length for each part
        return [
          description.slice(0, paragraphLength),
          description.slice(paragraphLength, 2 * paragraphLength),
          description.slice(2 * paragraphLength),
        ];
      };

      const splitContent = (content: string) => {
        const paragraphLength = Math.ceil(content.length / 3); // Calculate length for each part
        return [
          content.slice(0, paragraphLength),
          content.slice(paragraphLength, 2 * paragraphLength),
          content.slice(2 * paragraphLength),
        ];
      };



  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
    <View>
        <Stack.Screen options={{
            headerTitle: 'Detalles del Curso'
        }} />

<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
<Image 
          source={require('../../../assets/images/banner.png')} 
          style={{ width: 400, height: 180, marginBottom: 20 }} 
        />
  </View>

       {/* Display the course details */}
       <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
          {course?.title}
        </Text>
       
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'left', marginBottom: 10 }}>
            Personas a las que va dirigido este curso
          </Text>

        <Text style={{ textAlign: 'left', marginBottom: 10 }}>{course?.audience}</Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'left', marginBottom: 10 }}>
            Beneficios
          </Text>

        <Text style={{ textAlign: 'left', marginBottom: 10 }}>{course?.benefits}</Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'left', marginBottom: 10 }}>
            Requerimientos
          </Text>
        <Text style={{ textAlign: 'left', marginBottom: 10 }}> {course?.requirements}</Text>
         {/* Title for the description */}
         <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'left', marginBottom: 10 }}>
            Descripción
          </Text>

          {/* Display the description split into 3 paragraphs */}
          {course?.description &&
            splitDescription(course.description).map((paragraph, index) => (
              <Text key={index} style={{ textAlign: 'left', marginBottom: 10 }}>
                {paragraph}
              </Text>
            ))}
          <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'left', marginBottom: 10 }}>
            Contenido
          </Text>

          {course?.content &&
            splitContent(course.content).map((paragraph, index) => (
              <Text key={index} style={{ textAlign: 'left', marginBottom: 10 }}>
                {paragraph}
              </Text>
            ))}
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'left', marginBottom: 10 }}>
            Fecha de Envío de Correos
          </Text>

        <Text style={{ textAlign: 'left', marginBottom: 10 }}>{course?.sendEmailDate}</Text>
    </View>
    <View>
    <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'left', marginBottom: 10 }}>
            Formulario de Inscripción
          </Text>

      
    <TextInput
     label="Nombre Completo"
     value={text}
     onChangeText={text => setText(text)}
     mode="outlined"
     style={{ width: 360, height: 50 }} 
      />
       <TextInput
     label="Cédula"
     value={text}
     onChangeText={text => setText(text)}
     mode="outlined"
     style={{ width: 360, height: 50 }} 
      />
    
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    <TextInput
      label="Edad"
      value={text}
      onChangeText={text => setText(text)}
      mode="outlined"
      style={{ flex: 1, height: 50, marginRight: 10 }} // Add marginRight for spacing
    />
    <TextInput
      label="Teléfono"
      value={text}
      onChangeText={text => setText(text)}
      mode="outlined"
      style={{ flex: 1, height: 50 }} // Flex for proportional sizing
    />
  </View>
       <TextInput
     label="Nacionalidad"
     value={text}
     onChangeText={text => setText(text)}
     mode="outlined"
     style={{ width: 360, height: 50 }} 
      />
       <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    <TextInput
      label="Edad"
      value={text}
      onChangeText={text => setText(text)}
      mode="outlined"
      style={{ flex: 1, height: 50, marginRight: 10 }} // Add marginRight for spacing
    />
    <TextInput
      label="Teléfono"
      value={text}
      onChangeText={text => setText(text)}
      mode="outlined"
      style={{ flex: 1, height: 50 }} // Flex for proportional sizing
    />
  </View>
       <TextInput
     label="Correo Electrónico"
     value={text}
     onChangeText={text => setText(text)}
     mode="outlined"
     style={{ width: 360, height: 50 }} 
      />
     <Link href="/" asChild>
      <Button mode="contained" 
         buttonColor="#6200ee"
          style={{ paddingHorizontal: 72, height: 56, marginTop: 10 }} 
          labelStyle={{ fontSize: 16, lineHeight: 34 }} 
        >  
          Inscribirse
          </Button>
      </Link>  
    </View>
    </ScrollView>
  )
}