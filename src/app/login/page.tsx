"use client"

import { signIn } from "next-auth/react"
import { Button } from "@mui/material"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import styles from './page.module.css';

export default function Login() {
    const handleGoogleSignIn = () => {
        signIn("google", { callbackUrl: "/home" })
    }

    return (
        <div className={styles.login}>
            <Card className={styles.card}>
                <div>
                    <Typography variant="h5" className={styles.title}>Welcome Back!</Typography>
                    <Typography variant="body2" className={styles.subtitle}>Sign in to your account using Google</Typography>
                </div>
                <CardContent>
                    <div className={styles.actionButtons}>
                        <CardActions>
                            <Button
                                onClick={handleGoogleSignIn}
                                variant="outlined"
                                className={styles.signInButton}
                            >
                                Sign in with Google
                            </Button>
                        </CardActions>
                    </div>

                    <div className={styles.footer}>
                        <Typography variant="body2" className={styles.footerText}>
                            By signing in, you agree to our Terms of Service and Privacy Policy.
                        </Typography>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}