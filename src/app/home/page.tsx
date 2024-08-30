'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Button, Typography, Box, Container, Card, CardContent, CardActions } from '@mui/material';
import { SleeperService } from '@/services/sleeper-service';
import styles from './page.module.css';

export default function Home() {
    const [leagueId, setLeagueId] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const sleeperService = new SleeperService();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await sleeperService.getLeague(leagueId);
            console.log(response);
            if (response.ok) {
                router.push(`/dashboard/${leagueId}`);
            } else if (response === null) {
                setError('Invalid league ID. Please try again.');
            }
        } catch (err) {
            setError('Invalid league ID. Please check the ID and try again.');
        }
    };

    return (
        <div className={styles.wrapper}>
            <Card className={styles.card}>
                <CardContent>
                    <Typography variant="h4" component="h1" gutterBottom align="center">
                        Enter League ID
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mt: 1 }}>
                        <TextField
                            label="League ID"
                            value={leagueId}
                            onChange={(e) => setLeagueId(e.target.value)}
                            margin="normal"
                            required
                            className={styles.leagueIdInput}
                            placeholder="Enter League ID"
                            InputProps={{
                                style: { color: 'white' },
                            }}
                            InputLabelProps={{
                                style: { color: 'white' },
                            }}
                        />
                    </Box>
                </CardContent>
                <CardActions>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={handleSubmit}
                        className={styles.submitButton}
                        disabled={!leagueId}
                    >
                        Get League
                    </Button>
                </CardActions>
                {error && (
                    <Typography color="error" sx={{ mt: 2, textAlign: 'center', pb: 2 }}>
                        {error}
                    </Typography>
                )}
            </Card>
        </div>
    );
}