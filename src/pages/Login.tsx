import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@/components/ui/modal';
import { useToastProvider } from '@/components/ui/toast-provider';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { showToast } = useToastProvider();
  const [showPassword, setShowPassword] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showAdminPasswordModal, setShowAdminPasswordModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      showToast({
        type: 'error',
        title: 'Error',
        description: 'Harap isi semua field'
      });
      return;
    }
    setShowRoleModal(true);
  };

  const handleRoleSelection = (role: 'student' | 'seller' | 'admin') => {
    if (role === 'admin') {
      setShowRoleModal(false);
      setShowAdminPasswordModal(true);
    } else {
      setShowRoleModal(false);
      showToast({
        type: 'success',
        title: 'Login Berhasil',
        description: `Selamat datang, ${role === 'student' ? 'Siswa' : 'Penjual'}!`
      });
      navigate(`/dashboard/${role}`);
    }
  };

  const handleAdminPassword = () => {
    if (adminPassword === 'AdminGoTripGoEat') {
      setShowAdminPasswordModal(false);
      setAdminPassword('');
      showToast({
        type: 'success',
        title: 'Login Admin Berhasil',
        description: 'Selamat datang, Admin!'
      });
      navigate('/dashboard/admin');
    } else {
      showToast({
        type: 'error',
        title: 'Password Salah',
        description: 'Password admin tidak valid'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-primary/5 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-4 self-start"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>

        {/* Logo */}
        <div className="flex justify-center items-center space-x-2 mb-6">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">GT</span>
          </div>
          <span className="text-2xl font-bold text-primary">GoTripGoEat</span>
        </div>

        <h2 className="text-center text-3xl font-extrabold text-foreground">
          Masuk ke Akun Anda
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Atau{' '}
          <button
            onClick={() => navigate('/register')}
            className="font-medium text-primary hover:text-primary/80 transition-colors"
          >
            daftar akun baru
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1"
                placeholder="nama@sekolah.edu"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="mt-1 relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Masukkan password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="#" className="font-medium text-primary hover:text-primary/80">
                  Lupa password?
                </a>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full btn-ripple"
                size="lg"
              >
                Masuk
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="text-center text-sm text-muted-foreground">
              Belum punya akun?{' '}
              <button
                onClick={() => navigate('/register')}
                className="font-medium text-primary hover:text-primary/80"
              >
                Daftar sekarang
              </button>
            </div>
          </div>
        </Card>
      </div>

      {/* Role Selection Modal */}
      <Modal
        isOpen={showRoleModal}
        onClose={() => setShowRoleModal(false)}
        title="Pilih Peran Anda"
      >
        <div className="space-y-4">
          <p className="text-muted-foreground text-center">Kamu masuk sebagai siapa?</p>
          
          <div className="space-y-3">
            <Button
              onClick={() => handleRoleSelection('student')}
              className="w-full justify-start btn-ripple"
              variant="outline"
              size="lg"
            >
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-blue-600 font-bold">S</span>
              </div>
              Siswa
            </Button>
            
            <Button
              onClick={() => handleRoleSelection('seller')}
              className="w-full justify-start btn-ripple"
              variant="outline"
              size="lg"
            >
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-orange-600 font-bold">P</span>
              </div>
              Penjual
            </Button>
            
            <Button
              onClick={() => handleRoleSelection('admin')}
              className="w-full justify-start btn-ripple"
              variant="outline"
              size="lg"
            >
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-red-600 font-bold">A</span>
              </div>
              Admin
            </Button>
          </div>
        </div>
      </Modal>

      {/* Admin Password Modal */}
      <Modal
        isOpen={showAdminPasswordModal}
        onClose={() => {
          setShowAdminPasswordModal(false);
          setAdminPassword('');
        }}
        title="Verifikasi Admin"
      >
        <div className="space-y-4">
          <p className="text-muted-foreground text-center">Masukkan password admin untuk melanjutkan</p>
          
          <div>
            <Label htmlFor="adminPassword">Password Admin</Label>
            <Input
              id="adminPassword"
              type="password"
              placeholder="Masukkan password admin"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div className="flex space-x-3">
            <Button
              onClick={() => {
                setShowAdminPasswordModal(false);
                setAdminPassword('');
              }}
              variant="outline"
              className="flex-1"
            >
              Batal
            </Button>
            <Button
              onClick={handleAdminPassword}
              className="flex-1 btn-ripple"
            >
              Verifikasi
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Login;