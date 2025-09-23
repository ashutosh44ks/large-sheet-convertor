import csv
import random

# A list of predefined data to make the dummy data more realistic
TITLES = [
    "The Forgotten Garden", "Whispers in the Woods", "A Sky Full of Stars",
    "The Last Lighthouse", "Shadows of the City", "Echoes of a Dream",
    "The Silent Forest", "Winds of Change", "The Hidden Path", "Journey to the East"
]
AUTHORS = [
    "Aria Vance", "Kai Chen", "Seraphina Reed", "Leo Sterling",
    "Elara Knight", "Finnian Hayes", "Mira Solis", "Jasper Quinn",
    "Luna Rivers", "Orion Blake"
]
GENRES = [
    "Fantasy", "Science Fiction", "Mystery", "Romance", "Thriller", "Historical Fiction"
]

def generate_book_data(num_books):
    """Generates a list of dictionaries with dummy book data."""
    books = []
    for i in range(num_books):
        title = random.choice(TITLES)
        author = random.choice(AUTHORS)
        genre = random.choice(GENRES)
        published_year = random.randint(1950, 2024)
        isbn = f"978-{random.randint(100, 999)}-{random.randint(10000, 99999)}-{random.randint(1, 9)}"
        books.append({
            'title': title,
            'author': author,
            'genre': genre,
            'publishedYear': published_year,
            'isbn': isbn
        })
    return books

if __name__ == '__main__':
    # Adjust this value to change the number of books generated
    NUMBER_OF_BOOKS = 10000

    print(f"Generating {NUMBER_OF_BOOKS} book entries...")
    book_data = generate_book_data(NUMBER_OF_BOOKS)
    
    # Define the output file name and CSV headers
    output_filename = 'books.csv'
    fieldnames = ['title', 'author', 'genre', 'publishedYear', 'isbn']
    
    with open(output_filename, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(book_data)

    print(f"Successfully generated dummy data and saved it to {output_filename}")
