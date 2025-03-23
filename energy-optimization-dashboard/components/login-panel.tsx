"use client"

import { useState, useEffect } from "react"
import { Eye, EyeOff, Lock, Shield, User, AlertTriangle, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function LoginPanel({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [securityChecks, setSecurityChecks] = useState<string[]>([])
  const [loginAttempts, setLoginAttempts] = useState(0)
  const [blockedIPs, setBlockedIPs] = useState<string[]>([])
  const [securityStatus, setSecurityStatus] = useState<"idle" | "checking" | "success" | "warning" | "error">("idle")
  const [securityMessage, setSecurityMessage] = useState("")
  const [loading, setLoading] = useState(false)

  // Simulate security checks
  useEffect(() => {
    if (password) {
      // Calculate password strength
      let strength = 0
      if (password.length > 8) strength += 25
      if (/[A-Z]/.test(password)) strength += 25
      if (/[0-9]/.test(password)) strength += 25
      if (/[^A-Za-z0-9]/.test(password)) strength += 25
      setPasswordStrength(strength)

      // Update security checks
      const checks = []
      if (password.length > 8) checks.push("Length requirement met")
      if (/[A-Z]/.test(password)) checks.push("Contains uppercase letter")
      if (/[0-9]/.test(password)) checks.push("Contains number")
      if (/[^A-Za-z0-9]/.test(password)) checks.push("Contains special character")
      setSecurityChecks(checks)
    } else {
      setPasswordStrength(0)
      setSecurityChecks([])
    }
  }, [password])

  // Simulate random blocked IPs
  useEffect(() => {
    setBlockedIPs(["103.42.85.234", "45.227.255.206", "91.240.118.222", "185.220.101.33", "185.220.101.34"])
  }, [])

  const handleLogin = () => {
    if (!username || !password) {
      setSecurityStatus("error")
      setSecurityMessage("Username and password are required")
      return
    }

    setLoading(true)
    setSecurityStatus("checking")
    setSecurityMessage("Performing security checks...")

    // Simulate security checks
    setTimeout(() => {
      // Simulate brute force protection
      if (loginAttempts > 3) {
        setSecurityStatus("error")
        setSecurityMessage("Too many login attempts. Please try again later.")
        setLoading(false)
        return
      }

      // Simulate IP check
      const randomCheck = Math.random()
      if (randomCheck > 0.9) {
        setSecurityStatus("warning")
        setSecurityMessage("Unusual login location detected. Additional verification required.")
        setLoading(false)
        return
      }

      // Simulate successful login
      setSecurityStatus("success")
      setSecurityMessage("Security checks passed. Logging in...")

      setTimeout(() => {
        setLoading(false)
        if (username === "admin" && password === "Admin@123") {
          onLogin()
        } else {
          setLoginAttempts((prev) => prev + 1)
          setSecurityStatus("error")
          setSecurityMessage("Invalid username or password")
        }
      }, 1000)
    }, 2000)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Grid Genius Secure Login
        </CardTitle>
        <CardDescription>Access the energy optimization dashboard with enhanced security</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {securityStatus !== "idle" && (
          <Alert
            variant={
              securityStatus === "success" ? "default" : securityStatus === "warning" ? "warning" : "destructive"
            }
          >
            {securityStatus === "checking" && <AlertTriangle className="h-4 w-4" />}
            {securityStatus === "success" && <CheckCircle2 className="h-4 w-4" />}
            {securityStatus === "warning" && <AlertTriangle className="h-4 w-4" />}
            {securityStatus === "error" && <AlertTriangle className="h-4 w-4" />}
            <AlertTitle>
              {securityStatus === "checking"
                ? "Security Check"
                : securityStatus === "success"
                  ? "Success"
                  : securityStatus === "warning"
                    ? "Warning"
                    : "Error"}
            </AlertTitle>
            <AlertDescription>{securityMessage}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="username"
              placeholder="Enter your username"
              className="pl-9"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <p className="text-xs text-muted-foreground">Try using "admin" as username</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="pl-9"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-10 w-10"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">Try using "Admin@123" as password</p>
        </div>

        {password && (
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Password Strength</Label>
              <span className="text-xs">
                {passwordStrength <= 25
                  ? "Weak"
                  : passwordStrength <= 50
                    ? "Fair"
                    : passwordStrength <= 75
                      ? "Good"
                      : "Strong"}
              </span>
            </div>
            <Progress value={passwordStrength} className="h-2" />
            <div className="space-y-1">
              {securityChecks.map((check, i) => (
                <div key={i} className="flex items-center text-xs text-green-600">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  {check}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-muted p-3 rounded-md">
          <h4 className="text-sm font-medium mb-2 flex items-center">
            <Shield className="h-4 w-4 mr-1 text-primary" />
            Active Security Measures
          </h4>
          <ul className="text-xs space-y-1 text-muted-foreground">
            <li>• Brute force protection (max 5 attempts)</li>
            <li>• Geo-location verification</li>
            <li>• Real-time threat monitoring</li>
            <li>• Encrypted data transmission (AES-256)</li>
            <li>• Two-factor authentication ready</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button className="w-full" onClick={handleLogin} disabled={loading}>
          {loading ? "Authenticating..." : "Login"}
        </Button>

        <div className="mt-4 w-full">
          <p className="text-xs text-muted-foreground mb-1">Recently blocked suspicious IPs:</p>
          <div className="text-xs bg-muted p-2 rounded-md font-mono">
            {blockedIPs.map((ip, i) => (
              <div key={i} className="flex justify-between">
                <span>{ip}</span>
                <span className="text-red-500">Blocked</span>
              </div>
            ))}
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

