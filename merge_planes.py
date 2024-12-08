import pandas as pd
import re
import json

def create_id(name):
    # Convertir a minúsculas y reemplazar caracteres especiales
    id = name.lower()
    # Reemplazar caracteres no alfanuméricos con guiones
    id = re.sub(r'[^a-z0-9]+', '-', id)
    # Eliminar guiones al inicio y final
    id = id.strip('-')
    return id

def extract_location(location_str):
    # Eliminar el prefijo "Plane - "
    return location_str.replace('Plane - ', '')

def format_plane_data(row):
    return {
        'id': create_id(row['name']),
        'name': row['name'],
        'type': row['type'],
        'location': extract_location(row['location']),
        'effect': row['effect'],
        'chaosEffect': row['chaosEffect'],
        'imageUrl': None
    }

def main():
    # Leer el CSV
    df = pd.read_csv('planes_cleaned_v2.csv', delimiter=';', encoding='latin-1')
    
    # Crear la lista de objetos de planos
    planes = []
    for _, row in df.iterrows():
        plane = format_plane_data(row)
        planes.append(plane)
    
    # Crear el contenido del archivo TypeScript
    ts_content = """export interface Plane {
  id: string;
  name: string;
  type: 'universe' | 'special' | 'doctorwho';
  location: string;
  effect: string;
  chaosEffect: string;
  imageUrl?: string;
}

export const planes: Plane[] = %s;
""" % json.dumps(planes, indent=2)
    
    # Guardar el archivo
    with open('src/data/planes.ts', 'w', encoding='utf-8') as f:
        f.write(ts_content)
    
    print(f"Se han procesado {len(planes)} planos")
    print("Archivo guardado como src/data/planes.ts")
    
    # Mostrar algunos ejemplos
    print("\nEjemplos de planos procesados:")
    for plane in planes[:3]:
        print(f"\nID: {plane['id']}")
        print(f"Nombre: {plane['name']}")
        print(f"Ubicación: {plane['location']}")

if __name__ == "__main__":
    main() 