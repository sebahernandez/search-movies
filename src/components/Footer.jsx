// crea un footer en react con estilos css en una constante

const Footer = () => {
    return (
        <footer className="footer bg-black text-white py-10">
          <div className="container mx-auto">
            <p className="text-center">
                  Este es el contenido de mi footer. Puedes poner aquí cualquier información que quieras mostrar a tus usuarios.
            </p>
            <p className="text-center mt-2">
                  Hecho con <span className="text-red-600">&hearts;</span> por <a href="https://miweb.com" target="_blank">Mi Web</a>
            </p>
            </div>
        </footer>
    );
  };
  
  export default Footer;