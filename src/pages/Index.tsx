
import { useEffect } from 'react';

const Index = () => {
  useEffect(() => {
    // Redirection vers le portfolio HTML
    window.location.href = '/index.html';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Redirection en cours...</h1>
        <p className="text-xl text-muted-foreground">Vous allez être redirigé vers le portfolio.</p>
      </div>
    </div>
  );
};

export default Index;
